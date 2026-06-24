# ♻️ EcoWise AI: Smart Waste Segregation & Sustainability Assistant

EcoWise AI is a modern, responsive web application designed to help citizens segregate waste correctly, make informed disposal choices, and learn sustainable habits. It targets urban waste challenges directly in alignment with the United Nations Sustainable Development Goals (SDGs).

---

## 🎯 SDG & Impact Focus

*   **SDG 11: Sustainable Cities and Communities** – Enhances municipal solid waste management, reducing environmental footprint at the household and community levels.
*   **SDG 12: Responsible Consumption and Production** – Promotes correct recycling and safe handling of hazardous/electronic waste, preventing recyclable materials from entering landfills.
*   **SDG 13: Climate Action** – Reducing methane emissions from landfill waste by encouraging organic waste composting.

---

## ✨ Core Features

1.  **Smart Waste Classifier:**
    *   Input waste item names or preview images to identify how they should be sorted.
    *   Instantly groups waste into categories: *Recyclable*, *Organic*, or *Electronic/Hazardous*.
    *   Provides explicit **Disposal Methods** and **Recycling Recommendations** for each item.
2.  **Conversational Disposal Assistant:**
    *   A chat interface where users can ask questions like *"How do I dispose of cardboard boxes?"* or *"Where does fruit waste go?"*.
    *   Receives helpful, clear instructions regarding disposal categories, safe processing, and municipal guidelines.
3.  **Local History Log:**
    *   Automatically saves previous waste query results inside the browser's `localStorage` so users can track their historical contributions and choices.
4.  **Sustainability Insights:**
    *   Curated sustainability tips highlighting correct recycling habits, composting, battery safety, and carbon reduction.

---

## 🛠️ Technology Stack

*   **Frontend:** React 18, Vite, TypeScript, and Vanilla CSS Modules.
*   **Serverless/Edge Backend:**
    *   **Vercel Edge Functions:** Handlers in Deno-style standard Web APIs running inside the Vercel Edge Runtime (directory: `/api`).
    *   **Netlify Edge Functions:** Alternative handlers for Netlify static deployment (directory: `/netlify/edge-functions`).
*   **Database/Storage:** Browser `localStorage` (offline storage for query history).

---

## 📂 Project Structure

```text
EcoWise AI/
├── api/                       # Vercel Edge Functions
│   ├── disposal-chat.ts       # Chat endpoint for Vercel
│   ├── waste-classify.ts      # Waste classification endpoint for Vercel
│   └── wasteRules.ts          # Centralized rule engine for Vercel
├── netlify/
│   └── edge-functions/        # Netlify Edge Functions
│       ├── disposal-chat.ts
│       └── waste-classify.ts
├── src/                       # React frontend source files
│   ├── components/            # Reusable components
│   │   ├── AppShell.tsx       # Main page layout header/footer structure
│   │   └── AppShell.module.css
│   ├── pages/                 # App views/pages
│   │   ├── DisposalChatPage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── TipsPage.tsx
│   │   └── WasteClassifyPage.tsx
│   ├── services/
│   │   └── ecowiseApi.ts      # API call service handler (calls /api)
│   ├── utils/                 # Utility files
│   │   ├── history.ts         # localStorage save/load/clear helpers
│   │   └── wasteRules.ts      # Centralized offline rule engine (local fallback)
│   ├── App.tsx                # Client-side router-less view switcher
│   ├── main.tsx               # App entrypoint
│   └── vite-env.d.ts          # TypeScript environmental assets declarations
├── netlify.toml               # Netlify configuration (port mappings, rewrites)
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript compiler settings
└── vite.config.js             # Vite configuration with React support
```

---

## 🚀 Local Development Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
    cd EcoWise-AI
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Development Server:**
    To run the frontend only:
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

4.  **Run with Local Edge Functions (Netlify CLI):**
    If you want to run the full client-server stack with backend APIs locally, use Netlify Dev:
    ```bash
    npx netlify dev
    ```
    Access the unified proxy app at `http://localhost:8888`.

5.  **Compile & Build for Production:**
    To verify typescript compiling and generate final static files:
    ```bash
    npm run build
    ```

---

## 🔮 Future Roadmap (AI Integration)

For scaling beyond rule-based classification, this template is structured to easily integrate Large Language Models (LLMs):
*   **IBM Granite or Hugging Face LLM Integration:** Connect the Edge Function handlers `/api/waste-classify` and `/api/disposal-chat` to external LLM endpoints using prompt engineering.
*   **Retrieval-Augmented Generation (RAG):** Store local municipal waste manuals inside a vector database and retrieve city-specific recycling guidelines before feeding context to the AI response generator.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
