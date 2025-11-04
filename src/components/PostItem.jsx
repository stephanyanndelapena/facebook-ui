import React, { useState } from 'react'

// Displays a single post with author, content, image, and edit/delete buttons
export default function PostItem({ post, onEdit, onDelete }) {
    const [expanded, setExpanded] = useState(false) // toggle long text

    // Format date safely
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A'
        const date = new Date(dateStr)
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString()
    }

    return (
        <article className="post">
            {/* Post header */}
            <div className="post-header">
                <strong>{post.author || 'Unknown'}</strong>
                <time title={post.createdDate}>{formatDate(post.createdDate)}</time>
            </div>

            {/* Post image */}
            {post.imageUrl && (
                <div className="post-image">
                    <img
                        src={post.imageUrl}
                        alt="post"
                        onError={(e) => (e.target.style.display = 'none')}
                    />
                </div>
            )}

            {/* Post content */}
            <div className="post-content">
                <p>{expanded ? post.content : (post.content?.slice(0, 300) || '')}</p>
                {post.content && post.content.length > 300 && (
                    <button className="link-btn" onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            {/* Post actions */}
            <div className="post-actions">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete} className="danger">Delete</button>
                <div className="muted">Modified: {formatDate(post.modifiedDate)}</div>
            </div>
        </article>
    )
}
