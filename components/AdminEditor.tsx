"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminEditor() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
  }

  async function uploadImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('post-images').upload(fileName, file)
    if (error) throw error
    const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(data.path)
    return (urlData as any).publicUrl || urlData.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      let image_url = ''
      if (imageFile) {
        image_url = await uploadImage(imageFile)
      }

      const slug = slugify(title)

      const { error } = await supabase.from('blog_posts').insert([
        { title, slug, excerpt, content, image_url, published }
      ])

      if (error) throw error
      alert('Post saved')
      setTitle('')
      setExcerpt('')
      setContent('')
      setImageFile(null)
      setPublished(false)
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Error saving post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6 bg-secondary rounded">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-border-color rounded bg-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium">Excerpt</label>
        <input required value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full p-2 border border-border-color rounded bg-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium">Content (Markdown)</label>
        <textarea required value={content} onChange={e => setContent(e.target.value)} rows={12} className="w-full p-2 border border-border-color rounded bg-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium">Feature image</label>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
          <span className="text-sm">Publish now</span>
        </label>
      </div>

      <div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  )
}
