import { useEffect, useMemo, useRef, useState } from 'react'
import appConfig from './config/appConfig'
import { applyThemeMode, detectPreferredTheme, type ThemeMode } from './theme/appTheme'
import './App.css'
import './index.css'
import BrainLogo from './components/BrainLogo'

type AttachmentMeta = {
  id: string
  name: string
  size: string
  type: string
}

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  attachments?: AttachmentMeta[]
  pinned?: boolean
}

type Conversation = {
  id: string
  title: string
  pinned?: boolean
  messages: Message[]
}

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M19.4 15a1.9 1.9 0 0 0 .38 2.1l.06.06a2.3 2.3 0 0 1-3.26 3.26l-.06-.06a1.9 1.9 0 0 0-2.1-.38 1.9 1.9 0 0 0-1.1 1.7V22a2.3 2.3 0 1 1-4.6 0v-.1a1.9 1.9 0 0 0-1.1-1.7 1.9 1.9 0 0 0-2.1.38l-.06.06a2.3 2.3 0 1 1-3.26-3.26l.06-.06a1.9 1.9 0 0 0 .38-2.1 1.9 1.9 0 0 0-1.7-1.1H2a2.3 2.3 0 1 1 0-4.6h.1a1.9 1.9 0 0 0 1.7-1.1 1.9 1.9 0 0 0-.38-2.1l-.06-.06A2.3 2.3 0 1 1 6.62 2.3l.06.06a1.9 1.9 0 0 0 2.1.38A1.9 1.9 0 0 0 9.9 1V1a2.3 2.3 0 1 1 4.6 0v.1a1.9 1.9 0 0 0 1.1 1.7 1.9 1.9 0 0 0 2.1-.38l.06-.06A2.3 2.3 0 0 1 21.82 6.6l-.06.06a1.9 1.9 0 0 0-.38 2.1c.29.67.91 1.16 1.65 1.2H23a2.3 2.3 0 1 1 0 4.6h-.1c-.74.04-1.36.53-1.5 1.2Z" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
)

const PinIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 3h6l-1 7 3 3v2H7v-2l3-3-1-7Z" stroke="currentColor" strokeWidth="1.6" fill={filled ? 'currentColor' : 'none'}/>
    <path d="M12 15v6" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
)

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 7h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M6.5 7 7.3 18.4A2 2 0 0 0 9.29 20H14.7a2 2 0 0 0 1.99-1.6L17.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const ThemeToggle = ({ mode, onToggle }: { mode: ThemeMode; onToggle: () => void }) => (
  <button className="toggle" onClick={onToggle} aria-label="Toggle theme">
    <span className="sun">☀️</span>
    <span className="moon">🌙</span>
    <span className={`knob ${mode}`} />
  </button>
)

const AttachIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7.5 12.5 15 5a3.5 3.5 0 0 1 5 5l-8.5 8.5a4.5 4.5 0 0 1-6.4-6.4L13 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 3.6 20.4 12 4 20.4 6.8 12 4 3.6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="currentColor"
    />
  </svg>
)

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)
 
 function App() {
   const [theme, setTheme] = useState<ThemeMode>(detectPreferredTheme())
   const [query, setQuery] = useState('')
   const [pendingAttachments, setPendingAttachments] = useState<File[]>([])
   const [search, setSearch] = useState('')
   const [conversations, setConversations] = useState<Conversation[]>([
     {
       id: 'c1',
       title: 'Brand strategy ideas',
       pinned: true,
       messages: [
         { id: 'm1', role: 'assistant', content: appConfig.welcomeMessage },
       ],
     },
     { id: 'c2', title: 'Weekly planning', messages: [] },
     { id: 'c3', title: 'Code review notes', messages: [] },
   ])
   const [activeId, setActiveId] = useState('c1')
   const newChatCounter = useRef(conversations.length + 1)
 
   const active = useMemo(
     () => conversations.find(c => c.id === activeId) ?? conversations[0],
     [conversations, activeId]
   )

   const filtered = useMemo(() => {
     const q = search.toLowerCase()
     return conversations
       .filter(c => c.title.toLowerCase().includes(q))
       .sort((a, b) => Number(b.pinned) - Number(a.pinned))
   }, [conversations, search])

   useEffect(() => {
     applyThemeMode(theme)
   }, [theme])

   const toMeta = (file: File): AttachmentMeta => {
     const toReadable = (bytes: number) => {
       if (bytes === 0) return '0 B'
       const units = ['B', 'KB', 'MB', 'GB']
       const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
       const value = bytes / Math.pow(1024, index)
       return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[index]}`
     }
     return {
       id: crypto.randomUUID(),
       name: file.name,
       type: file.type || 'Unknown',
       size: toReadable(file.size),
     }
   }

   const onSend = () => {
     const text = query.trim()
     if (!text && pendingAttachments.length === 0) return
     const userMsg: Message = {
       id: crypto.randomUUID(),
       role: 'user',
       content: text || '(Attachment)',
       attachments: pendingAttachments.map(toMeta),
     }
     const assistantMsg: Message = {
       id: crypto.randomUUID(),
       role: 'assistant',
       content:
         pendingAttachments.length === 0
           ? `You said: "${text}". This is a mock response.`
           : `Nice upload! Here’s a mock acknowledgement for ${pendingAttachments.length} attachment(s).`,
     }
     const deriveTitle = (input: string) => {
       if (!input) return null
       // Take first sentence or up to 48 characters
       const first = input.split(/(?<=[\.\?\!])\s|\n/)[0] || input
       const trimmed = first.slice(0, 48)
       const cleaned = trimmed.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()
       if (!cleaned) return null
       // Capitalize first letter, keep rest as typed
       return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
     }

     setConversations(prev =>
       prev.map(c => {
         if (c.id !== active.id) return c
         const isFirst = c.messages.length === 0
         const newTitle = isFirst ? deriveTitle(text) : null
         return {
           ...c,
           title: newTitle ?? c.title,
           messages: [...c.messages, userMsg, assistantMsg],
         }
       })
     )
     setQuery('')
     setPendingAttachments([])
     setTimeout(() => {
       document.getElementById('bottom-anchor')?.scrollIntoView({ behavior: 'smooth' })
     }, 0)
   }

   const inputRef = useRef<HTMLTextAreaElement | null>(null)
   const fileInputRef = useRef<HTMLInputElement | null>(null)
   const canSend = query.trim().length > 0 || pendingAttachments.length > 0

   const handleNewChat = () => {
     const id = crypto.randomUUID()
     const title = `${appConfig.newChatLabel} ${newChatCounter.current++}`
     const freshConversation: Conversation = {
       id,
       title,
       messages: [],
     }

     setConversations(prev => [freshConversation, ...prev])
     setActiveId(id)
     setQuery('')
     setPendingAttachments([])
     setSearch('')
     requestAnimationFrame(() => {
       inputRef.current?.focus()
     })
   }

   const handleDeleteChat = (id: string) => {
     setConversations(prev => prev.filter(chat => chat.id !== id))
     if (activeId === id) {
       const remaining = conversations.filter(chat => chat.id !== id)
       if (remaining.length > 0) {
         setActiveId(remaining[0].id)
       } else {
         const blankId = crypto.randomUUID()
         const blankConversation: Conversation = {
           id: blankId,
           title: appConfig.newChatLabel,
           messages: [],
         }
         setConversations([blankConversation])
         setActiveId(blankId)
       }
     }
   }
 
   return (
     <div className="app-root">
       <aside className="sidebar">
         <div className="sidebar-header">
           <BrainLogo />
           <div className="brand">
             <h1>{appConfig.appName}</h1>
             <p>{appConfig.tagline}</p>
           </div>
           <button className="icon-btn" aria-label="Settings">
             <SettingsIcon />
           </button>
         </div>
         <div className="sidebar-actions">
           <button className="new-chat-btn" onClick={handleNewChat}>
             <span className="icon"><PlusIcon /></span>
             {appConfig.newChatLabel}
           </button>
         </div>
         <div className="sidebar-tools">
           <div className="search">
             <input
               placeholder="Search chats…"
               value={search}
               onChange={e => setSearch(e.target.value)}
             />
           </div>
           <ThemeToggle
             mode={theme}
             onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
           />
         </div>
         <div className="history">
           <div className="history-title">{appConfig.historyTitle}</div>
           <ul>
             {filtered.map(conv => (
               <li
                 key={conv.id}
                 className={`history-item ${conv.id === active.id ? 'active' : ''}`}
                 onClick={() => setActiveId(conv.id)}
               >
                 <span className="title">{conv.title}</span>
                 <div className="history-actions">
                   <button
                     className={`pin ${conv.pinned ? 'pinned' : ''}`}
                     onClick={(e) => {
                       e.stopPropagation()
                       setConversations(prev =>
                         prev.map(c =>
                           c.id === conv.id ? { ...c, pinned: !c.pinned } : c
                         )
                       )
                     }}
                     aria-label="Pin chat"
                     title="Pin chat"
                   >
                     <PinIcon filled={!!conv.pinned} />
                   </button>
                   <button
                     className="delete"
                     onClick={(e) => {
                       e.stopPropagation()
                       handleDeleteChat(conv.id)
                     }}
                     aria-label="Delete chat"
                     title="Delete chat"
                   >
                     <DeleteIcon />
                   </button>
                 </div>
               </li>
             ))}
           </ul>
         </div>
       </aside>
       <main className="chat">
         <header className="chat-header">
           <div className="title">
             <BrainLogo size={36} variant="badge" />
             <span>{active.title}</span>
           </div>
         </header>
         <section className={`messages ${active.messages.length === 0 ? 'empty' : ''}`}>
           {active.messages.length === 0 && (
             <div className="welcome">
               <BrainLogo size={52} />
               <h2>{appConfig.appName}</h2>
               <p>{appConfig.welcomeMessage}</p>
             </div>
           )}
           {active.messages.map(m => (
             <div key={m.id} className={`message ${m.role}`}>
               <div className="bubble">
                 <div>{m.content}</div>
                 {m.attachments && m.attachments.length > 0 && (
                   <div className="attached-files">
                     {m.attachments.map(att => (
                       <div key={att.id} className="attachment-chip">
                         <span className="file-name">{att.name}</span>
                         <span className="file-meta">{att.size}</span>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
           ))}
           <div id="bottom-anchor" />
         </section>
         <footer className="composer">
           {pendingAttachments.length > 0 && (
             <div className="attachment-preview">
               {pendingAttachments.map(file => (
                 <div key={file.name + file.lastModified} className="attachment-chip">
                   <span className="file-name">{file.name}</span>
                   <span className="file-meta">{Math.round(file.size / 1024)} KB</span>
                   <button
                     className="remove-attachment"
                     onClick={() =>
                       setPendingAttachments(prev =>
                         prev.filter(item => item !== file)
                       )
                     }
                     aria-label="Remove attachment"
                   >
                     ✕
                   </button>
                 </div>
               ))}
             </div>
           )}
           <div className="input-wrap">
             <button
               className="attach"
               aria-label="Attach files"
               onClick={() => fileInputRef.current?.click()}
             >
               <AttachIcon />
             </button>
             <textarea
               ref={inputRef}
               rows={1}
               placeholder={`Message ${appConfig.appName}…`}
               value={query}
               onChange={e => setQuery(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault()
                   onSend()
                 }
               }}
             />
             <button className="send" onClick={onSend} aria-label="Send message" disabled={!canSend}>
               <SendIcon />
             </button>
           </div>
           <input
             ref={fileInputRef}
             type="file"
             multiple
             hidden
             onChange={(event) => {
               const files = event.target.files
               if (!files) return
               setPendingAttachments(prev => [...prev, ...Array.from(files)])
               event.target.value = ''
             }}
           />
           <div className="hint">Press Enter to send • Shift+Enter for new line</div>
         </footer>
       </main>
     </div>
   )
 }

export default App
