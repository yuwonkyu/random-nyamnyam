from rembg import remove
from PIL import Image
import os
import io

slimes_dir = "./assets/slimes"
files = [f for f in os.listdir(slimes_dir) if f.endswith('.png')]


def has_transparency(path):
    """이미 투명 배경(알파 채널에 투명 픽셀)이 있는지 확인"""
    try:
        img = Image.open(path)
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            img = img.convert('RGBA')
            alpha = img.getchannel('A')
            # 가장 투명한 픽셀 값이 255 미만이면 이미 누끼 처리됨
            return alpha.getextrema()[0] < 255
    except Exception:
        pass
    return False


targets = [f for f in files if not has_transparency(os.path.join(slimes_dir, f))]
skipped = len(files) - len(targets)

print(f"전체 {len(files)}개 / 이미 처리됨 {skipped}개 / 처리 대상 {len(targets)}개")

if not targets:
    print("처리할 이미지가 없습니다. 모두 이미 누끼 처리됨")
else:
    for i, filename in enumerate(targets):
        path = os.path.join(slimes_dir, filename)
        print(f"[{i+1}/{len(targets)}] {filename} 처리 중...")

        with open(path, 'rb') as f:
            input_data = f.read()

        output_data = remove(input_data)

        with open(path, 'wb') as f:
            f.write(output_data)

    print(f"✅ 완료! {len(targets)}개 이미지 누끼 처리됨")
