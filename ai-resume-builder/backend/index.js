const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-resume', async (req, res) => {
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
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});