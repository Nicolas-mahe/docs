# Volcano Solutions Brand Guide

This guide presents the visual elements and brand components for Volcano Solutions to ensure consistency across all our projects and tools.

import { ButtonPreview, LinkPreview, FlashPreview} from '@site/src/components/BrandPreview';

## Général configuration

Tailwind CSS must be imported, place the following in the html document's head :
```code 
<script src="https://cdn.tailwindcss.com"></script>
```
##
All the used icons are imported from font-awesome, you need to place the following in the html document's head:
```code
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
```

## Color Palette

Every colors set after a class, like `.text-white`, depend on Tailwind CSS classes and have to be written directly in the html has a class object.

- **Background color**: `#1A1D23` - Main background color
- **Secondary background color**: `#23262b` - Usually used for cards background or section contrast delimitation
- **Cards border color**:  `#border-gray-700` - All the card border have to be that color
- **Font primary color**: `text-white` - Color for general text and general titles
- **Font secondary color**: `text-gray-300` - Color for secondary text and paragraph
- **Font footer color**: `text-gray-400` - Text's color in footer 

## Links

### Navigation Links
```code
text-white hover:text-orange-400 transition-colors
```

<LinkPreview type="navigation">This is an example of navigation link !</LinkPreview>

### Other Links
```code
text-gray-300 hover:text-orange-400 transition-colors
```

<LinkPreview type="other">This is an example of link !</LinkPreview>

## Buttons

### Primary Gradiant Button

Code for the css file
```css
.btn-gradient  {
    background: linear-gradient(45deg, #ff4500, #ff8c00);
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
    transition: all 0.3s ease;
}

.btn-gradient:hover {
    background: linear-gradient(45deg, #ff5500, #ff9c00);
    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
}
```

Code for the html file has class object with tailwind
```code
class="btn-gradient px-12 py-4 rounded-lg text-white font-semibold text-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
```

<ButtonPreview type="primary">Primary Gradiant Button</ButtonPreview>

### Secondary Button
Code for the css file
```css
.btn-outline-glow {
    border: 2px solid #3b82f6;
    color: #60a5fa;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
    background: transparent;
}

.btn-outline-glow:hover {
    border-color: #60a5fa;
    color: #93c5fd;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
    background: rgba(59, 130, 246, 0.1);
}
```

Code for the html file has class object with tailwind
```code
class="btn-outline-glow px-12 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300"
``` 

<ButtonPreview type="secondary">Secondary Button</ButtonPreview>

## Typography

### Main Typography

We use the google font Montserrat.
It has to be declared in the css file in the body object.

```css
body {
    font-family: 'Montserrat', sans-serif;
}
```
Import the font in the html file's head
```code
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap" rel="stylesheet">
```
And add this script in the html's head to make it app global
```code
<script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'montserrat': ['Montserrat', 'sans-serif'],
                    },
                }
            }
        }
    </script>

```

## Cards and Containers

### Standard Card, Grid Friendly and Responsive
Put that in the html 
```code
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="p-6 rounded-lg border border-gray-700">
    </div>
</div>

```
And that in the CSS
```css
container{
    background-color: #23262b;
} 
```

## Images

### Logo and Favicon
- **Primary Logo** : https://www.volcano-solutions.com/static/img/logo1.png
- **Favicon** : https://www.volcano-solutions.com/static/img/fav.png

---