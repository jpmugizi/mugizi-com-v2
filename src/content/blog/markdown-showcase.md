---
title: "Markdown Showcase"
date: 2024-12-06
category: "engineering"
description: "A showcase of all markdown elements and styling."
---

This post demonstrates all the markdown elements you can use in your blog posts.

## Text Formatting

Here's some **bold text** and some *italic text*. You can also combine them for ***bold and italic***. Sometimes you might want to use ~~strikethrough~~ for deleted content.

Here's some `inline code` within a paragraph.

## Links

Here's a [simple link](https://example.com) and here's a [link to GitHub](https://github.com) that opens normally. You can also write bare URLs: https://astro.build

## Headings

The title above is an h1. Here are the other heading levels:

## Heading 2 - Major Sections

### Heading 3 - Subsections

#### Heading 4 - Minor Points

## Lists

### Unordered List

- First item in the list
- Second item with more detail
  - Nested item one
  - Nested item two
- Third item to finish

### Ordered List

1. First step in the process
2. Second step follows naturally
3. Third step completes the flow
   1. Sub-step A
   2. Sub-step B

## Blockquotes

> This is a blockquote. It's great for highlighting important quotes or callouts. The styling should make it stand out from regular text.

> "The best code is no code at all."
>
> — Someone wise, probably

## Code Blocks

Here's a Python code block:

```python
def hello_world(name: str) -> str:
    """A simple greeting function."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    message = hello_world("JP")
    print(message)
```

And here's some TypeScript:

```typescript
interface BlogPost {
  title: string;
  date: Date;
  category: 'engineering' | 'career' | 'life';
  draft?: boolean;
}

const posts: BlogPost[] = await getCollection('blog');
```

And a bash command:

```bash
pnpm dev
```

## Images

Here's an image (using a placeholder):

![Placeholder image](https://picsum.photos/800/400)

Images with captions work too:

![A scenic view](https://picsum.photos/800/300)

*This is an image caption - typically styled in italics below the image.*

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Dark mode | Done | Default theme |
| Blog posts | Done | Markdown support |
| RSS feed | Pending | Future phase |
| Search | Pending | Future phase |

## Horizontal Rule

Content above the line.

---

Content below the line.

## Embedded Video

For YouTube embeds, you'll need to use raw HTML:

<iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="border-radius: 8px; margin: 1.5rem 0;">
</iframe>

## Task Lists

- [x] Set up Astro project
- [x] Create dark theme
- [x] Add Geist fonts
- [ ] Add profile photo
- [ ] Write real blog posts

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Summary

That covers most of the markdown elements you'll use. Check how each one looks and let me know what needs adjusting!
