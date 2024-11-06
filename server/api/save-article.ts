import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || !body.content || !body.title || !body.slug || !body.description || !body.topics) {
    return { status: 400, message: 'Invalid data' };
  }

  const { content, title, slug, description, topics } = body;
  const fileName = `${slug}.md`;
  const githubToken = process.env.GITHUB_TOKEN;
  const owner = 'SalahEldinFikri'; // Replace with your GitHub username
  const repo = 'SalahEldinFikri.github.io'; // Replace with your GitHub repository name
  const filePath = `content/posts/${fileName}`;

  const markdownContent = `---
title: "${title}"
slug: "${slug}"
description: "${description}"
topics: ${JSON.stringify(topics)}
date: ${new Date().toISOString()}
---

${content}`;

  const contentBase64 = Buffer.from(markdownContent).toString('base64');

  try {
    // Check if the file already exists
    const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
    });

    // If the file exists, get the SHA to update it
    let sha = null;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;  // Get the SHA of the file
    }

    // Prepare the API request for either creating or updating the file
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add or update article: ${title}`,
        content: contentBase64,
        sha: sha,  // Include the SHA if updating an existing file
        branch: 'main',  // Specify the branch (you can change it to your branch name)
      }),
    });

    // Check the response from GitHub
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
