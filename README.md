# Real-time-collaborative-Whiteboard
A real time collaborative whiteboard application, coded in ReactJs and TS, and utilising Live blocks for the real time capabilities.

- Users can create a whiteboard to plan their next project, and then generate a code, in which another user can then enter in to join the same workspace.

- If a user is logged in, they will be able to create multiple different workspaces under their account, as well as being able to sort, filter, edit, delete etc via a dashboard page.
- However signing in is not required, and with a guest account you should be able to create a temporary board, with a code to share to others.

- I've chosen to use Liveblocks for the collaborative capabilities of the app because this is my first time creating such an app, and so I didn't want to spend too much time learning something that has already been abstracted away for me. 
However, I still want to understand what's happening under the hood with WebSockets, and this project is a good vehicle for it.

I will not go so far as to use TLDraw for this project, as this abstracts away half the application.

---
## 📷 Screenshots - Everything is subject to change including this UI

<img width="1913" height="970" alt="image" src="https://github.com/user-attachments/assets/c6b3b482-bb46-40c3-8e9f-d46e39ef4598" />

<img width="1913" height="970" alt="image" src="https://github.com/user-attachments/assets/d0f659bc-317e-47df-9ec3-95d697f371b5" />

---

## 🛠 Planned Features

- Allow users to create view and delete their own whiteboards, which join a "room" that other users can join under the same URL.
- Give users the chance to share a board with others, generating a unique code.
- users should see others updates in real time, as well as others cursors.
- let users see others accounts if they are present in the same whiteboard.

- Let users Draw, Add shapes, delete, erase, grab the canvas, change brush colour / width and add sticky notes.
- Allow a user to connect to their google account in order to save multiple boards. No account is required for sharing a board.

- Include an anonymous board that everyone can join, without an account, permanently saved so everyone has a small space to draw together.

## ✔️ Completed Features

- Allow users to create view, search, filter and delete their own whiteboards via a personal dashboard, clicking on one joins a "room" that other users can join under the same URL.
- Users should see others updates in real time, as well as others cursors.
- Let users Draw, Add shapes, delete, erase, grab the canvas, change brush colour / width and add sticky notes.
- Sidebar utility that lets users quick swap without having to go back to the dashboard.

- Zoom feature and small widget on the canvas.

## 🛠 Technologies Used (so far)

- **Frontend**: React, TypeScript, Figma, Liveblocks, Supabase, Google Oauth, RadixUI.
- **Libraries**:  Perfect-Freehand, Liveblocks (for collab persistance), React Router, React-tooltip.

---

## 📌 Status

This project is currently in development. Future updates and refinements will drop over time.

---

## 📫 Contact

If you're interested in the project, feel free to connect or follow the development:

- GitHub: [DanielSteele1](https://github.com/DanielSteele1)
- Portfolio: [danielsteele.dev](https://danielsteele.dev)
- LinkedIn: [Daniel Steele](https://www.linkedin.com/in/daniel-steele1)
