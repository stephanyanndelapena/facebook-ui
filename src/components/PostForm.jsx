import React, { useEffect, useState } from 'react'

// Form for creating or editing a post
export default function PostForm({ initial = null, onSubmit, onCancel }) {
    // clearer internal state names
    const [name, setName] = useState(initial?.author || '')
    const [body, setBody] = useState(initial?.content || '')
    const [image, setImage] = useState(initial?.imageUrl || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // When the selected "initial" post changes, populate the form
    useEffect(() => {
        setName(initial?.author || '')
        setBody(initial?.content || '')
        setImage(initial?.imageUrl || '')
    }, [initial?.id])

    // Clear all fields
    const clearForm = () => {
        setName('')
        setBody('')
        setImage('')
    }

    // Submit handler — keeps same behavior but clearer variable names
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim()) {
            alert('Author is required')
            return
        }

        const payload = {
            author: name.trim(),
            content: body.trim() || '',
            imageUrl: image.trim() || ''
        }

        setIsSubmitting(true)
        try {
            // Pass the clearForm helper so caller can reset on success if desired
            await onSubmit(payload, clearForm)
        } catch (err) {
            alert('Failed to save: ' + (err?.message || String(err)))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className="post-form" onSubmit={handleFormSubmit}>
            <label>
                Author
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-label="Author"
                />
            </label>

            <label>
                Content
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="What's on your mind?"
                    aria-label="Content"
                />
            </label>

            <label>
                Image URL (optional)
                <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    aria-label="Image URL"
                />
            </label>

            <div className="form-actions">
                <button
                    type="submit"
                    disabled={isSubmitting}
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
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#166fe0')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1877f2')}
                >
                    {isSubmitting ? 'Saving...' : 'Create Post'}
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