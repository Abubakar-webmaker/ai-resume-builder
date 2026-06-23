const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, skills, experience, education, jobTitle, location } = req.body;

  const prompt = `Generate a professional resume for the following person:

Name: ${name}
Email: ${email}
Phone: ${phone}
Job Title: ${jobTitle}
Location: ${location}
Skills: ${skills}
Experience: ${experience}
Education: ${education}

Instructions:
- Write in plain text only
- NO markdown, NO asterisks, NO bullet symbols
- Use CAPITAL LETTERS for section headings
- Use dashes (-) for bullet points
- Keep it clean and ATS-friendly
- Sections: Professional Summary, Skills, Work Experience, Education
- Do NOT repeat contact information at the end
- Start directly with PROFESSIONAL SUMMARY
- Do NOT include Name or Contact at the end again`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const resume = response.data.choices[0].message.content;
    res.json({ resume });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate resume' });
  }
};