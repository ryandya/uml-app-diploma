from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import cv2
import numpy as np

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_class_blocks(img):
    img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    img_pil = img_pil.resize((img_pil.width * 2, img_pil.height * 2), Image.LANCZOS)
    img_resized = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)

    gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    blocks = []

    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if w < 150 or h < 80:
            continue

        block_img = img_resized[y:y+h, x:x+w]
        text = extract_text_from_block(block_img)
        lines = [l.strip() for l in text.splitlines() if l.strip()]

        if not lines:
            continue

        if lines[0].startswith(('-', '+')):
            continue

        blocks.append({
            'bbox': (x, y, w, h),
            'image': block_img,
            'text': text
        })

    blocks.sort(key=lambda b: b['bbox'][1])
    return blocks

def extract_text_from_block(block_img):
    block_pil = Image.fromarray(cv2.cvtColor(block_img, cv2.COLOR_BGR2RGB))

    enhancer = ImageEnhance.Contrast(block_pil)
    block_pil = enhancer.enhance(2.0)

    block_pil = block_pil.convert('L')  # в оттенки серого
    block_pil = block_pil.point(lambda x: 0 if x < 128 else 255, '1')  # бинаризация

    config = "--psm 6 --oem 3"
    text = pytesseract.image_to_string(block_pil, config=config)

    return text.strip()