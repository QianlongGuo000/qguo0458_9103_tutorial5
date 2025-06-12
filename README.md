## Interaction instruction

Once the page is loaded, the animation automatically starts. It will present rotating and scaling colorful rings, a background of translucent colorful dots that scale over time, rotating colorful particles around the canvas center, and a meteor effect with diagonal motion across the canvas. The animation loops continuously and autonomously.


## Individual approach

#### Animation driver
I chose time as the driver for my animation. All dynamic behaviors are time-based, using functions such as frameCount(), sin() and so on.

#### Animated properties
My individual animation focuses on adding time-based visual dynamics:
-  Translucent colorful dots in the background which scale randomly and have different sizes. Each dot has a unique scaling pattern based on its own random angle and speed.
-  Colorful dots rotate around the center which look like floating particles. Their positions update in each frame.
-  A meteor effect that looks like meteors are crossing the canvas diagonally. New meteors regenerate after the previous ones leaving the screen, creating a continuous flow.
  
#### Inspiration and reference
- Rotating dots inspired by *Star Rings Neg* ([Star Rings Neg](https://openprocessing.org/sketch/742312)): I adapted the idea of using angle updates (this.angle += this.speed) to rotate elements around a center, and applied it to colorful particle movement.
![Star Rings Neg screenshot](images/Star%20Rings%20Neg.png)
- Meteor effect inspired by *Meteor Shower* ([Meteor Shower](https://openprocessing.org/sketch/2479925)): I learned from the structure of using arrays for position and speed, and reset conditions to keep meteors flowing.
![Meteor Shower screenshot](images/Meteor%20Shower.png)

#### Technical explanation
- **Randomly Sized & Continuously Scaled Color Dot Backgrounds**
    `generateBackgroundDots() + drawBackgroundDots()`
    Creates colorful translucent dots with different sizes as the background. Radius of each dot is animated using the sin() function with a random angle and speed, so the size and scaling of each dot are different.
    I removed the gradient background from the group code for a cleaner visual of showing the dots.
- **Rotating dots**
    `generateRotatingDots() + drawRotatingDots()`
    Multiple randomly generated color dots rotate around the center of the canvas. Their positions are calculated using polar coordinates (cos(angle), sin(angle)) and updated by incrementing the angle every frame. This section references *Star Rings Neg* in its use of angle-based movement and array that stores dots.
- **Meteor effect**
    `meteor() + drawMeteor()`
    Meteors are generated at random positions and falling speeds, and move diagonally across the screen from top right to bottom left. When the meteor exits the screen, its position is reset and a new meteor will continue to be generated at that position. This section is inspired by *Meteor shower*. I adapted its use of for loops to control position and speed of the meteors, and if statements to reset them after they leave the screen.