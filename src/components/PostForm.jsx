import React, { useEffect, useState } from 'react'

// Form for creating or editing a post
export default function PostForm({ initial = null, onSubmit, onCancel }) {
    const [author, setAuthor] = useState(initial?.author || '')
    const [content, setContent] = useState(initial?.content || '')
    const [imageUrl, setImageUrl] = useState(initial?.imageUrl || '')
    const [submitting, setSubmitting] = useState(false)

    // Reset form when editing a new post
    useEffect(() => {
        setAuthor(initial?.author || '')
        setContent(initial?.content || '')
        setImageUrl(initial?.imageUrl || '')
    }, [initial?.id])

    // Reset all fields
    const reset = () => {
        setAuthor('')
        setContent('')
        setImageUrl('')
    }

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!author.trim()) {
            alert('Author is required')
            return
        }
        const payload = { author: author.trim(), content: content.trim() || '', imageUrl: imageUrl.trim() || '' }
        setSubmitting(true)
        try {
            await onSubmit(payload, reset)
        } catch (err) {
            alert('Failed to save: ' + (err.message || err))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            {/* Author input */}
            <label>
                Author
                <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
            </label>

            {/* Content textarea */}
            <label>
                Content
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" />
            </label>

            {/* Optional image URL */}
            <label>
                Image URL (optional)
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </label>

            {/* Buttons */}
            <div className="form-actions">
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        backgroundColor: '#1877f2',
                        color: 'white',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#166fe0'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1877f2'}
                >
                    {submitting ? 'Saving...' : 'Create Post'}
                </button>

                {onCancel && (
                    <button type="button" className="link-btn" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}
