# DISCORD CLONE CLIENT DOCUMENTATION

<img src="https://img.shields.io/github/stars/minhtrifit/discord-clone-client"/> ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/minhtrifit/discord-clone-client)

![Thumbnail](./showcase/screenshot.png)

🎓 📚 Realtime chat & video call app inspired from [Discord](https://discord.com)

This project includes two repository (Client and Server), you can checkout **[server repository](https://github.com/minhtrifit/discord-clone-server)**

## 💻 Technical Stack

<p align="left"> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

- [Next.js14](https://nextjs.org) - The React Framework for the Web
- [React.js](https://react.dev) - The library for web and native user interfaces
- [Shadcn UI](https://ui.shadcn.com) - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
- [Tailwind CSS](https://tailwindcss.com) - Rapidly build modern websites without ever leaving your HTML
- [TypeScript](https://www.typescriptlang.org) - JavaScript with syntax for types.

## ⚙️ Config .env file

Config [.env]() file in root dir with path `./.env`

- [Github Oauth setup](hhttps://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=minhtrifit
GITHUB_ID=
GITHUB_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_ADMIN_CODE=admin
NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_HOST=your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_project_key
```

- [Supabase setup](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

- To get **Supabase** config
  Go to **Project Settings** > General to get **your_project_id**

![supabase setup](./showcase/supabase_anon.png)

- Now move on **API Keys** > General to get **ANON_KEY**

![supabase setup](./showcase/supabase_key.png)

## ⚙️ Config Supabase project

For using upload file feature, you need to enable **storage** service

![supabase setup](./showcase/supabase1.png)

![supabase setup](./showcase/supabase2.png)

![supabase setup](./showcase/supabase3.png)

![supabase setup](./showcase/supabase4.png)

![supabase setup](./showcase/supabase5.png)

![supabase setup](./showcase/supabase6.png)

## 📦 Installation

Intall packages & dependencies

```console
npm install
```

Or install packages with legacy peer dependencies.

```console
npm install --legacy-peer-deps
```

Run client project (supported by [Create Next App](https://nextjs.org/docs/getting-started/installation))

```console
npm run dev
```

# ⚡️ Project Showcase

Landing Page:

![Landing](./showcase/landing.png)

Login Page:

- Email & password login
- Oauth with Github login

![Login](./showcase/login.png)

Register Page:

- Admin passcode for register admin account

![Login](./showcase/register.png)

Dashboard:

- Realtime friend request (all friend, add friend, pending friend)
- Realtime direct message

![Dashboard](./showcase/dashboard.png)

Chat Page:

- Realtime text chat
- Realtime file chat (image, pdf, docx, xlsx)

![Chat](./showcase/chat1.png)

![Chat](./showcase/chat2.png)

Server page:

- Group realtime chat
- Joining server by invite link

![Server](./showcase/server1.png)

![Server](./showcase/server2.png)

Admin page:

- View users analysis
- View servers analysis
- View storage charts

![Admin](./showcase/admin1.png)

![Admin](./showcase/admin2.png)

## ▶️ YouTube Demo

[![Thumnail](./showcase/screenshot.png)](https://youtu.be/L8ixcX2tIdk)

## 💌 Contact

- Author - [minhtrifit](https://minhtrifitdev.netlify.app)
- [Github](https://github.com/minhtrifit)

> CopyRight© minhtrifit
