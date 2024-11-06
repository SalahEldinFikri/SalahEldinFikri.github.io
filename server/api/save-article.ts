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
  const filePath = `./content/posts/${fileName}`;
  const githubToken = process.env.GITHUB_TOKEN;
  const owner = 'SalahEldinFikri'; // Replace with your GitHub username
  const repo = 'SalahEldinFikri.github.io'; // Replace with your GitHub repository name

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
    // Fetch the current articles (to prepend the new article to the top)
    const getArticlesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/content/posts/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!getArticlesResponse.ok) {
      return { status: 500, message: 'Failed to fetch existing articles' };
    }

    // Get the current list of files (articles)
    const existingArticles = await getArticlesResponse.json();

    // Sort the articles by their creation date (if needed, otherwise just add the new article)
    const sortedArticles = existingArticles.sort((a, b) => {
      const aDate = new Date(a.commit.committer.date);
      const bDate = new Date(b.commit.committer.date);
      return bDate - aDate; // Sort in descending order (newest first)
    });

    // Prepend the new article to the list
    const updatedArticles = [markdownContent, ...sortedArticles];

    // Now, upload the new article to GitHub
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/content/posts/${fileName}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add new article: ${title}`,
        content: contentBase64,
        branch: 'main', // Use the appropriate branch name
      }),
    });

    if (response.ok) {
      return { status: 200, message: 'Article added successfully and pushed to GitHub!' };
    } else {
      const error = await response.json();
      console.error('GitHub API error:', error);
      return { status: 500, message: 'Failed to add article', error };
    }
  } catch (error) {
    console.error('Error during article save:', error);
    return { status: 500, message: 'Internal error', error };
  }
});
