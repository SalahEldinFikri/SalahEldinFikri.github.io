import { promises as fs } from 'fs';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  // Get the request body content
  const body = await readBody(event);
  
  // Validate the data
  if (!body || !body.content || !body.title || !body.slug || !body.description || !body.topics) {
    return { status: 400, message: 'Invalid data' };
  }

  const { content, title, slug, description, topics } = body;

  // Format the file name using the slug
  const fileName = `${slug}.md`;
  
  // Define the content folder and file path
  const filePath = `./content/posts/${fileName}`;

  // Format content for markdown with metadata
  const markdownContent = `---
title: "${title}"
slug: "${slug}"
description: "${description}"
topics: ${JSON.stringify(topics)}
date: ${new Date().toISOString()}
---

${content}`;

  // Write the file
  try {
    await fs.writeFile(filePath, markdownContent, 'utf-8');
    return { status: 200, message: 'Article saved successfully' };
  } catch (error) {
    console.error('Error writing file:', error);
    return { status: 500, message: 'Failed to save article' };
  }
});
