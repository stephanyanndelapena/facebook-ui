import React from 'react'
import PostItem from './PostItem'

// Renders a list of PostItem components
export default function PostList({ posts, onEdit, onPatch, onDelete }) {
  // Show message if there are no posts
  if (!posts || posts.length === 0) {
    return <div className="muted">No posts yet</div>
  }

  // Map through posts and render each PostItem
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={() => onEdit?.(post)}
          onPatch={(partial) => onPatch?.(post.id, partial)}
          onDelete={() => onDelete?.(post.id)}
        />
      ))}
    </div>
  )
}
