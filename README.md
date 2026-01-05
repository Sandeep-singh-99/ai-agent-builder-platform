# AI Agent Builder Platform

A powerful, visual platform for building and managing AI agents. Create complex agent workflows using a drag-and-drop node-based editor.

![image](./screenshot/Screenshot%202026-01-05%20130153.png)

## 🚀 Features

- **Visual Workflow Builder**: Design agent logic using an intuitive node-based interface powered by React Flow.
- **Diverse Node Types**:
  - **Agent Node**: Define core agent behaviors.
  - **Logic Nodes**: Implement control flow with `If/Else` and `While` loops.
  - **Interaction Nodes**: Add `User Approval` steps for human-in-the-loop workflows.
  - **Integration Nodes**: Connect to external services with `API` nodes.
- **Real-time Persistence**: Seamlessly save and load agent configurations using Convex.
- **Secure Authentication**: User management and security provided by Clerk.
- **Modern UI/UX**: Built with Next.js 16, Tailwind CSS 4, and Radix UI for a polished experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Visual Flow**: [React Flow (@xyflow/react)](https://reactflow.dev/)
- **Backend & Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-agent-builder-platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory and add your Clerk and Convex credentials:

   ```env
   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

4. **Start the Development Server**

   You need to run both the Next.js frontend and the Convex backend.

   **Terminal 1 (Frontend):**

   ```bash
   npm run dev
   ```

   **Terminal 2 (Backend):**

   ```bash
   npx convex dev
   ```

5. **Open the App**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `agent-builder/`: Core builder interface.
  - `dashboard/`: User dashboard for managing agents.
- `convex/`: Backend logic, schema, and API functions.
- `components/`: Reusable UI components.
- `context/`: Global state management (e.g., WorkflowContext).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
