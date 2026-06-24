# EcoWise AI - Build & Deploy Checklist

- [ ] Create missing multi-page frontend (index.html, classify.html, chat.html, tips.html, history.html)
- [ ] Create React/Vite entry + router-less multi-page structure
- [ ] Build UI for:
  - [ ] Image upload → waste classification (rule-based)
  - [ ] Text chat → disposal guidance (rule-based)
  - [ ] Sustainability tips page
  - [ ] History page (localStorage)
- [ ] Implement client services to call Netlify Edge Functions
- [ ] Implement Netlify Edge Functions endpoints:
  - [ ] /api/waste-classify
  - [ ] /api/disposal-chat
- [ ] Ensure build works: npm install, npm run build
- [ ] Ensure deployment works on Netlify
- [ ] Document deploy steps in PRD.md (or here)

