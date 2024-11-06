import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  // Get the request body content
  const body = await readBody(event);
  
  // Validate the data
  if (!body || !body.content || !body.title || !body.slug || !body.description || !body.topics) {
    return { status: 400, message: 'Invalid data' };
  }

  // Extract article data from request body
  const { content, title, slug, description, topics } = body;
  const fileName = `${slug}.md`; // Format the file name using the slug

  // GitHub repository details
  const githubToken = process.env.GITHUB_TOKEN; // GitHub token stored in Vercel's environment variables
  const owner = 'SalahEldin Fikri'; // Replace with your GitHub username
  const repo = 'SalahEldinFikri.github.io'; // Replace with your GitHub repository name
  const filePath = `content/posts/${fileName}`; // Target path in the GitHub repo

  // Format content as Markdown with front matter metadata
  const markdownContent = `---
title: "${title}"
slug: "${slug}"
description: "${description}"
topics: ${JSON.stringify(topics)}
date: ${new Date().toISOString()}
---

${content}`;

  // Convert the content to Base64, as required by the GitHub API
  const contentBase64 = Buffer.from(markdownContent).toString('base64');

  try {
    // Send a PUT request to the GitHub API to create or update the file
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add new article: ${title}`,
        content: contentBase64,
        branch: 'main', // Specify the branch to which you want to push
      }),
    });

    // Check response from GitHub
    if (response.ok) {
      return { status: 200, message: 'Article saved and pushed to GitHub successfully!' };
    } else {
      const error = await response.json();
      console.error('GitHub API error:', error);
      return { status: 500, message: 'Failed to save article to GitHub', error };
    }
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    return { status: 500, message: 'Failed to save article', error };
  }
});
