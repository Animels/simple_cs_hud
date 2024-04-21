# What is that

Incomplete CS HUD :)

# Installation and startup

if you really want to start it and start project you need:

- node

After that you need to: 
1. Open the terminal and navigate to /back
2. Run npm install 
3. Run "npm run start"
4. Open new terminal window and navigate to /front
5. Run npm install
6. Run "npm run dev"
7. Put "gamestate_integration_simple_hud.cfg" into your \steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg
8. Start the game
9. Go to http://localhost:5173/admin (if you have nothing changed)


# If you want your theme

Essentially, you have a folder containing themes located at front/src/themes, and the router for the HUD will
dynamically select folder names from the theme context. So, if you desire your own theme, you can create entirely new
components for the radar, header, and sidebars. Subsequently, place them within the front/src/themes folder under your
new theme name. Then, update the path to the theme folder via the admin panel and that's it.








