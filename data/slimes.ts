export type SlimeCategory = '음식' | '디저트';

export type Slime = {
  id: string;
  name: string;
  emoji: string;
  category: SlimeCategory;
  image: number;
};

export const SLIMES: Slime[] = [
  { id: 'a1', name: '초밥', emoji: '🍣', category: '음식', image: require('../assets/slimes/a1_sushi.png') },
  { id: 'a2', name: '파스타', emoji: '🍝', category: '음식', image: require('../assets/slimes/a2_pasta.png') },
  { id: 'a3', name: '삼겹살', emoji: '🥓', category: '음식', image: require('../assets/slimes/a3_samgyeopsal.png') },
  { id: 'a4', name: '커피', emoji: '☕', category: '디저트', image: require('../assets/slimes/a4_coffee.png') },
  { id: 'a5', name: '아이스크림', emoji: '🍦', category: '디저트', image: require('../assets/slimes/a5_icecream.png') },
  { id: 'b1', name: '피자', emoji: '🍕', category: '음식', image: require('../assets/slimes/b1_pizza.png') },
  { id: 'b2', name: '치킨', emoji: '🍗', category: '음식', image: require('../assets/slimes/b2_chicken.png') },
  { id: 'b3', name: '떡볶이', emoji: '🌶️', category: '음식', image: require('../assets/slimes/b3_tteokbokki.png') },
  { id: 'b4', name: '라멘', emoji: '🍜', category: '음식', image: require('../assets/slimes/b4_ramen.png') },
  { id: 'b5', name: '짜장면', emoji: '🍲', category: '음식', image: require('../assets/slimes/b5_jjajang.png') },
  { id: 'c1', name: '비빔밥', emoji: '🥗', category: '음식', image: require('../assets/slimes/c1-bibimbab.png') },
  { id: 'd01', name: '김밥', emoji: '🍙', category: '음식', image: require('../assets/slimes/d01_gimbap.png') },
  { id: 'd02', name: '순대', emoji: '🌭', category: '음식', image: require('../assets/slimes/d02_soondae.png') },
  { id: 'd03', name: '튀김', emoji: '🍤', category: '음식', image: require('../assets/slimes/d03_twigim.png') },
  { id: 'd04', name: '우동', emoji: '🍜', category: '음식', image: require('../assets/slimes/d04_udon.png') },
  { id: 'd05', name: '샌드위치', emoji: '🥪', category: '음식', image: require('../assets/slimes/d05_sandwich.png') },
  { id: 'd06', name: '라면', emoji: '🍜', category: '음식', image: require('../assets/slimes/d06_ramyeon.png') },
  { id: 'd07', name: '곱창', emoji: '🥩', category: '음식', image: require('../assets/slimes/d07_gopchang.png') },
  { id: 'd08', name: '보쌈', emoji: '🥬', category: '음식', image: require('../assets/slimes/d08_bossam.png') },
  { id: 'd09', name: '짬뽕', emoji: '🍲', category: '음식', image: require('../assets/slimes/d09_jjambbong.png') },
  { id: 'd10', name: '탕수육', emoji: '🍖', category: '음식', image: require('../assets/slimes/d10_tangsuyuk.png') },
  { id: 'd11', name: '식빵', emoji: '🍞', category: '디저트', image: require('../assets/slimes/d11_sikppang.png') },
  { id: 'd12', name: '만두', emoji: '🥟', category: '음식', image: require('../assets/slimes/d12_mandu.png') },
  { id: 'd13', name: '마라탕', emoji: '🌶️', category: '음식', image: require('../assets/slimes/d13_maratang.png') },
  { id: 'd14', name: '마라샹궈', emoji: '🥘', category: '음식', image: require('../assets/slimes/d14_marashangguo.png') },
  { id: 'd15', name: '솜사탕', emoji: '🍭', category: '디저트', image: require('../assets/slimes/d15_somtang.png') },
  { id: 'd16', name: '쌀국수', emoji: '🍜', category: '음식', image: require('../assets/slimes/d16_ssalnoodle.png') },
  { id: 'd17', name: '김치볶음밥', emoji: '🍳', category: '음식', image: require('../assets/slimes/d17_kimchifry.png') },
  { id: 'e01', name: '불고기', emoji: '🥩', category: '음식', image: require('../assets/slimes/e01_bulgogi.png') },
  { id: 'e02', name: '냉면', emoji: '🍜', category: '음식', image: require('../assets/slimes/e02_naengmyeon.png') },
  { id: 'e03', name: '된장찌개', emoji: '🍲', category: '음식', image: require('../assets/slimes/e03_doenjang.png') },
  { id: 'e04', name: '김치찌개', emoji: '🍲', category: '음식', image: require('../assets/slimes/e04_kimchijjigae.png') },
];
