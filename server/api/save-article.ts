import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the data
  if (!body || !body.content || !body.title || !body.slug || !body.description || !body.topics) {
    return { status: 400, message: 'Invalid data' };
  }

  const { content, title, slug, description, topics } = body;

  // Format the file name using the slug
  const fileName = `${slug}.md`;
  const githubToken = process.env.GITHUB_TOKEN;
  const owner = 'SalahEldinFikri'; // Replace with your GitHub username
  const repo = 'SalahEldinFikri.github.io'; // Replace with your GitHub repository name
  const filePath = `content/posts/${fileName}`; // Path relative to the repository root

  // Format content for markdown with metadata
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
    // Check if the file already exists to decide if we need to provide the `sha`
    const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
    });

    let sha = null;
    if (getFileResponse.ok) {
      // File exists, so we extract the `sha` for updating
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // Proceed with creating or updating the file
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add or update article: ${title}`,
        content: contentBase64,
        sha, // Include sha only if updating an existing file
        branch: 'main', // Use the appropriate branch name
      }),
    });

    if (response.ok) {
      return { status: 200, message: 'Article added or updated successfully and pushed to GitHub!' };
    } else {
      const error = await response.json();
      console.error('GitHub API error:', error);
      return { status: 500, message: 'Failed to add or update article', error };
    }
  } catch (error) {
    console.error('Error during article save:', error);
    return { status: 500, message: 'Internal error', error };
  }
});
