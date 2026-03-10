# amis4630-spring26-hansen
AMIS 4630 Buckeye Marketplace Project



## Milestone 2 — Feature Prioritization (Kanban Board)
In the Kanban board visible in projects, Buckeye Marketplace features/user-stories were organized in order of prioritization in the following format:
## Backlog -> Must-Have -> Should-Have -> Future Enhancements
More specifically, Buckeye Marketplace features were organized based on their ability to support core functionality of both order processing, and website functionality at large. Addressing pain points identified through my crafted user personas and journey map, (Milestone 1), also served integral in decision making.

Must-Have features were organized based on their ability to enable essential marketplace workflows like product search, processing orders, and offering personal, yet also secure, account access. Users like Connor Yukon, who needs clear guidance during the purchasing process, and Jay Ritzmann, a new-grad needing efficient tools integrated into the marketplace, serve as the most critical points of reference.

Should-Have features come next. While not required at launch, such features are intended to further user experience by way of enhancing usablity, offering avenues of communication, and expand Buckeye Marketplace to a wider array of services.

Finally, later enhancements represent the innovative functionality of the marketplace. In keeping pace with todays rapid technological innovation, features like Gen AI-powered user assistance, and automated workflows enabling efficiency, will enable Buckeye Marketplace to offer key-differentiators, distancing itself from competition.



## Milestone 3 — Product Catalog: Vertical Slice 1
Within this milestone, I began full stack development for Buckeye Marketplace. Students can now browse through listings posted and view respective details. Additionally, add to cart functionality has been implemented (though isn't fully functionable yet, given that the landing page/product pages have only been developed).
## What was developed?
- **Backend** (.NET Web API)
  - ProductsController with two endpoints: GET /api/products and GET /api/products/{id} (404 if not found). In-memory static list of 8 products across Textbooks, Electronics, and Furniture. CORS enabled for the React dev server, Swagger UI available in development.
  - **Frontend** (React + Vite + TypeScript) — Product List and Product Detail pages connected via React Router. Respective data can be fetched live from the API backend, with no hardcoded products. Loading, error, and empty states handled throughout. Cart system built with React Context and useReducer, similar to what was developed during our cart workshop. CSS Modules were implemented (as reccomendation of Github Copilot) used for scoped component styling.

Additionally, I utilized an **Agents.md** resulting in much better outputs associated with Github Copilot. Placed in the root, this file defines coding standards across the project, structure for directory and overall guidelines to follow. This was developed using Claude with the prompt: 

"You're a software engineer with specialty in full stack development with React and .NET. Currently, you're working on building Buckeye Marketplace, which will function as a hub for all things Ohio State. My stack within React on the frontend and .NET 8.0 is being utilized, and I'd like you to generate an AGENTS.md file to be placed in the root of the repo. This file will offer consistent framework for all Gen AI based outputs within VS Code's integrated chat terminal. It shoulld define the following: project stack, project needs, folder structure, controller patterns, and TypeScript rules, among anything else relevant. Reference the AGENTS.md file posted from our workshop in cart development as that of an aid to draw information/ideas based off - it defines core patterns for .NET API as well as General Exception Handling. Lastly, in-memory data should be defined private static."

**AI Tools Used**
Github Copilot Agent: Claude Opus 4.6 - Integrated chat terminal in VS Code
Claude.ai - Base, Sonet 4.6 model - General questions related to milestone steps, ideas to integrate, etc.

As for prompt engineering, I utilized general framework: "You're a software enginner with specialty in full stack development with React and .NET, acting as one of the lead voices in prompt engineering around the globe." 
  - From here, Claude was able to output various steps I should take regarding development. After scaffolding what had been done within the backend (api) layer, it outlined steps to fortify my frontend layer in a step-by-step fashion, as to not overload Github Copilot...or my brain.
  - One of the most impactful installments was CSS modules, which allowed for each component to have its own isolated stylesheet. This made UI-oriented improvments much easier, given that design will just stay constant (like how in the layout file, all heading-related design is called upon from the CSS module, giving design consistency). 
  - I also extended the prompt above, adding "Output effective prompts relevant to (x given step/file), in order to maximize design principles within both relevant .css and .csx. This gave way to many new prompts, some of which were helpful, and a lot of which had to be modified to work better with Opus.

Example: "Following AGENTS.md, create src/services/api.ts. Import the Product interface from ../types. Define API_BASE_URL as http://localhost:5000. Export getProducts() and getProductById(id) with proper error handling."

**Cart Integration**

As for cart integration, Github Copilot originally generated the entire system onto one file, similar to what occurred in the cart workshop. After identifying this (which ultimately limited relevant cart-button visuals in general). To fix, I wrote a prompt within Github Copilot: "You're a software engineer leading development on the Buckeye Marketplace project. You've just identified code flaws within the current cart architecture system. As a result, you must parse out the given architecture assignments, to result in proper cart-oriented visuals on the frontend. Draw on instructions written in AGENT.md as not to violate architecture guidelines." 

The split the cart into 5 relevant files (cartTypes, cartReducer, CartContext, CartProvider, and useCart), and ultimately allowed cart architecture to work in the first place.


