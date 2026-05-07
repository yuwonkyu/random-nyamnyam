from rembg import remove
from PIL import Image
import os

slimes_dir = "./assets/slimes"
files = [f for f in os.listdir(slimes_dir) if f.endswith('.png')]

print(f"총 {len(files)}개 이미지 처리 시작...")

for i, filename in enumerate(files):
    path = os.path.join(slimes_dir, filename)
    print(f"[{i+1}/{len(files)}] {filename} 처리 중...")

    with open(path, 'rb') as f:
        input_data = f.read()

    output_data = remove(input_data)

    with open(path, 'wb') as f:
        f.write(output_data)

print("✅ 완료! 모든 이미지 누끼 처리됨")
