'use client'
import { useState, useCallback } from 'react'

let _resolve = null

export function useConfirm() {
  const [state, setState] = useState({ open: false, msg: '' })

  const confirm = useCallback((msg) => {
    setState({ open: true, msg })
    return new Promise(res => { _resolve = res })
  }, [])

  const Modal = () => !state.open ? null : (
    <div className="modal-overlay" style={{ zIndex: 3000 }}>
      <div className="modal-box" style={{ padding: '20px', maxWidth: '360px' }}>
        <p style={{ marginBottom: '16px', color: 'var(--fg)', fontWeight: 500 }}>{state.msg}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-d" style={{ flex: 1 }} onClick={() => { setState({ open: false, msg: '' }); _resolve(true) }}>
            yeah do it 💀
          </button>
          <button className="btn btn-s" style={{ flex: 1 }} onClick={() => { setState({ open: false, msg: '' }); _resolve(false) }}>
            nah cancel
          </button>
        </div>
      </div>
    </div>
  )

  return { confirm, Modal }
}
