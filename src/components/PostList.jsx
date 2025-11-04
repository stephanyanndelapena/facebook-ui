import React from 'react'
import PostItem from './PostItem'

// Renders a list of PostItem components
export default function PostList({ posts, onEdit, onPatch, onDelete }) {
  const items = posts || []

  if (items.length === 0) {
    return <div className="muted">No posts yet</div>
  }

  const renderItem = (item) => {
    const handleEdit = () => onEdit?.(item)
    const handlePatch = (partial) => onPatch?.(item.id, partial)
    const handleDelete = () => onDelete?.(item.id)

    return (
      <PostItem
        key={item.id}
        post={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    )
  }

  return <div className="post-list">{items.map(renderItem)}</div>
}
