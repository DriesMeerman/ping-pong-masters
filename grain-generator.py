from PIL import Image
import numpy as np

# Parameters for the grain texture
width, height = 1024, 1024  # Size of the grain image
opacity_level = 0.25         # Opacity for the grain overlay (10%)

# Generate random noise (film grain)
noise = np.random.normal(loc=127, scale=20, size=(height, width)).astype(np.uint8)

# Create a grayscale image from the noise
grayscale = Image.fromarray(noise, mode='L')

# Create an alpha channel for transparency
alpha = Image.new('L', (width, height), color=int(255 * opacity_level))

# Combine into RGBA
film_grain = Image.merge('RGBA', (grayscale, grayscale, grayscale, alpha))

# Save the output
output_path = './public/grain.png'
film_grain.save(output_path)

print(f"Film grain overlay generated and saved to: {output_path}")
