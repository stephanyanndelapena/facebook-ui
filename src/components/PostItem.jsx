import React, { useState } from 'react'

// Displays a single post with author, content, image, and edit/delete buttons
export default function PostItem({ post, onEdit = () => {}, onDelete = () => {} }) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Convert an ISO/serial date string into a readable label
    const formatDateString = (dateStr) => {
        if (!dateStr) return 'N/A'
        const d = new Date(dateStr)
        return Number.isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleString()
    }

    const previewText = post.content ? post.content.slice(0, 300) : ''
    const isLong = Boolean(post.content && post.content.length > 300)

    return (
        <article className="post">
            <div className="post-header">
                <strong>{post.author || 'Unknown'}</strong>
                <time title={post.createdDate}>{formatDateString(post.createdDate)}</time>
            </div>

            {post.imageUrl && (
                <div className="post-image">
                    <img
                        src={post.imageUrl}
                        alt="post"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                </div>
            )}

            <div className="post-content">
                <p>{isExpanded ? post.content : previewText}</p>
                {isLong && (
                    <button className="link-btn" onClick={() => setIsExpanded(prev => !prev)}>
                        {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            <div className="post-actions">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete} className="danger">Delete</button>
                <div className="muted">Modified: {formatDateString(post.modifiedDate)}</div>
            </div>
        </article>
    )
}