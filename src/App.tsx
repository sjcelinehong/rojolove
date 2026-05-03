/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Palette, 
  BookOpen, 
  MessageCircle, 
  ArrowLeft,
  X,
  ChevronRight
} from 'lucide-react';

// --- Types ---
type View = 'entry' | 'menu' | 'art' | 'novel' | 'love';

interface ArtItem {
  id: string;
  thumbnail: string;
  image: string;
  artist: string;
}

interface NovelItem {
  id: string;
  thumbnail: string;
  artist: string;
  name: string;
  content: string;
}

interface LoveMessage {
  id: string;
  text: string;
  side: 'left' | 'right';
  sender: string;
}

// --- Mock Data ---
const ART_DATA: ArtItem[] = [
  {
    id: '1',
    thumbnail: './asset/kimyunji.jpg',
    image: './asset/kimyunji.jpg',
    artist: '김윤지',
  },
  {
    id: '2',
    thumbnail: './asset/kkapssap.jpg',
    image: './asset/kkapssap.jpg',
    artist: '깝싹이',
  },
  {
    id: '3',
    thumbnail: './asset/donmang.png',
    image: './asset/donmang.png',
    artist: '돈까스망치',
  },
  {
    id: '4',
    thumbnail: './asset/mimji.png',
    image: './asset/mimji.png',
    artist: '밈지',
  },
  {
    id: '5',
    thumbnail: './asset/at.jpg',
    image: './asset/at.jpg',
    artist: '앗',
  },
  {
    id: '6',
    thumbnail: './asset/ione.jpg',
    image: './asset/ione.jpg',
    artist: '이온',
  },
  {
    id: '7',
    thumbnail: './asset/wallo.png',
    image: './asset/wallo.png',
    artist: '왈로',
  },
  {
    id: '8',
    thumbnail: './asset/qua.png',
    image: './asset/qua.png',
    artist: '쿠아',
  }
];

const NOVEL_DATA: NovelItem[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=200&auto=format&fit=crop',
    artist: '베제타',
    name: 'Mille-Feuille and Fondant au chocolat',
    content: `“저기, 로한, 그…” 

“왜 그러지? 음식이 입에 안 맞나?”

“아, 아뇨. 그건 아니고요. 음식은 완전 맛있슴다.”

“그래, 그럼 다행이네.”

죠스케는 주위를 힐끔 둘러본다. 화려한 샹들리에가 위에서 흔들리는, 고급 레스토랑. 옆 테이블에는 화려한 드레스와 정장을 차려입은 사람들이 비싸보이는 고기를 썰며 샴페인 잔을 부딪치고 있었다. 테이블의 사이사이로 단정한 웨이터 복을 입은 직원들이 소리 없이 흘러갔다. 고개를 숙이고, 한 손에 든 포크를 식탁보 위의 디저트로 향했다. 하얀 슈가파우더가 뿌려진 퐁당 오 쇼콜라는, 중심부를 찌르자 안에서 뜨거운 초콜릿이 쏟아지며 달큰한 향을 뿌리고 있었다. 입맛이 도는 장면이지만, 지금은 단 걸 먹고 싶지가 않다. 포크를 그대로 내려놓은 죠스케는 다시 한 번 고개를 들어 눈 앞에 남자를 바라보았다.

“그냥… 궁금한 게 좀 있는데요, 물어봐도 되나, 해서…”

“궁금한 게 있으면 물어봐도 좋아. 네게 숨기는 건 없으니까.”

죠스케는 눈을 가늘게 뜨며 상대방을 노려봤다. 그러나 상대방은 이상한 일도 단 하나도 없다는 듯이. 태연한 표정으로 제 몫의 밀푀유를 입으로 옮기고 있었다. 입가에 묻히지도 않고 잘도 먹네. 시선을 눈치챈 듯, 남자의 눈썹이 살짝 꿈틀거린다. 계속 바라보는 시선의 이유를 묻고 있는 것처럼. 이내 어쩔 수 없다는 듯 한숨을 쉬고는, 다시 포크를 든다. 부드러운 크림과 가벼운 페스츄리가 겹겹이 쌓인 밀푀유가 파삭, 소리를 내며 포크에 무너져 내린다. 계속해서 그 모습을 노려보고 있었더니, 갑자기 눈 앞에 밀푀유가 얹힌 포크가 불쑥, 들이밀어졌다. 당황스런 표정으로 바라보자, 서두르라는 듯 포크가 가볍게 흔들리며 입가에 가까워진다. 

그러니까, 이건…

“...역시 이상하잖아!”

“뭐야. 먹고 싶어서 본 게 아니었나?”

“그게 아니라! 역시 이상하다고, 당신!!”

키시베 로한, 20세, 인기 만화가, 스탠드 유저, 언제나 자신 취향에 맞는 기묘한 복장을 입고 다니는, 약간 괴팍한 성격의 모리오초 주민.

그리고 오늘 하루 뿐만이 아니라, 며칠 전부터 히가시카타 죠스케를 고민하게 만든 범인(이자 연인)이다.

갑작스레 울려퍼진 고함 소리에 레스토랑 안에 흐르던 클래식이 잠시 멈춘다. 잠깐의 적막이 지속되고, 이내 주위에서 웅성웅성 거리며 시선이 집중되는 것이 느껴진다. 그러나 지금의 죠스케에게 그런 곳에 신경 쓸 여유는 없었다. 로한은 어쩔 수 없다는 듯 한숨을 쉬고 손에 들고 있던 포크를 접시에 내려놓았다. 죠스케는 팔짱을 단단히 낀 채, 어디 한 번 말해보라는 듯 로한을 노려보고 있었다. 눈에 불만과 의심이 가득해 뚝뚝 떨어질 지경이었다. 로한은 다시 한 번 눈썹을 까딱이고는 똑같이 팔짱을 끼려다, 이내 자세를 바로 하고는 죠스케를 바라봤다. 

“내가 이상하다고? 뭐, 정상에서 벗어난다. 라는 의미를 따지면 그렇게 평가하는 인물이 있을지도 모르지. 그렇지만, 죠스케 네가 말하는 ‘이상하다’는 이런 의미가 아닐 것 같은데… 자세히 설명해주면 좋겠다만.”

그러면서 로한은 부드럽게 웃었다. 그러니까, 로한이. 갑자기 죠스케가 버럭거리면서 큰 소리를 내고, 당신 이상하다고 소리를 쳤는데, 부드럽게 웃었다. 죠스케가 부들부들 떨더니, 이번엔 테이블을 쾅 치며 자리에서 일어섰다. 덜컹거리며 포크가 테이블 위에서 날뛰었다.

“그러니까! 지금 이런 행동들! 이상하잖아요!”

다시 한 번 레스토랑에 적막이 찾아왔다. 아까보다도 더 많은 시선이 달라 붙는 게 느껴진다. 로한은 깊은 한숨을 쉬고는 다시 입을 열었다. 죠스케 앞에 놓인 케이크의 초콜릿은 점차 식어가고 있었다. 

“...그러니까, 네가 말하는 ‘지금 이런 행동들’이 무엇인지를 묻고 있는 건데.”

“아아아–! 이상하다고요! 로한 당신, 나한테 잘해주잖아. 그것도 엄청 잘해주잖아! 그게 이상하다고!!”

“너는 지금… 이 키시베 로한이, 애인에게 잘 해줄리가 없는 사람일리 없다. 그렇게 주장하는 건가, 히가시카타 죠스케?”

“아아~ 그게 아님다! 아니, 조금은 그렇게 생각할 지도 모르지만! 일단 그게 중요한 게 아니고!”

“지금 애인이 날 잘해주면 이상한 사람이라고 평가하고 있는데, 이것보다 중요한 게 뭐가 있지?”

“그게 중요한 게 아니라니까요! 로한, 나한테 뭐 잘못한 거 있슴까!? 그래서 이러는 거 아니야! 그만 솔직하게 불라고요!”

“도대체 어쩌다 그런 결론이 나온 건지 이쪽이 묻고 싶은 심정이다만.”

자리에 앉은 두 사람이 서로를 지그시 노려보다, 이내 자리에 앉은 죠스케가 툴툴 거리며 입을 열기 시작했다.

“그치만, 요즘 로한, 엄청 이상했슴다… 당장 아까는 아앙~ 하려고 했고, 이런 좋은 레스토랑도 데려오고, 저번엔 명품도 사주고, 내가 귀찮게 굴어도 뭐라 하지도 않고…”

로한은 어이가 없다는 눈으로 침묵했다. 그게 무슨 문제가 되는 지, 도대체 그런 행동에서 무슨 이유로 로한이 무언가 잘못했다는 결론이 나오는 건지. 계속해 들어보겠다는 듯 팔짱을 끼곤 손을 까딱였다. 아까보다 현저하게 다정함이 적어진 태도임에도, 죠스케는 도리어 안심하는 것 마냥 줄줄이 이야기를 늘어놓기 시작했다.

“로한이 은근 로맨티스트라는 거, 나도 알고 있슴다? 그치만… 과하다고요! 지금까지 이런 적 없었잖아, 이렇게까지 러브러브인 키시베 로한이라니, 코이치도 본 적이 없을텐데… 100% 뭔가 잘못한 게 있어서, 그걸 대충 넘어가려고 나한테 잘 해주는 거 아님까?”

“...”

“뭐, 뭔데요… 진짜로. 도대체 무슨 짓을 한 거야, 당신? 죠스케 군이 들어보고, 그럭저럭 용서해줄테니까… 솔직히 고백하라고요. 이정도까지 오면 무섭다고…”

죠스케는 할 얘기가 다 끝났는지, 깊게 한숨을 쉬고는 의자에 늘어지듯 몸을 눕혔다. 그 모습을 바라보던 로한은, 크게 심호흡을 하고, 이내 입을 열었다.

“...먼저, 이걸 짚어두고 가지.”

“아아, 이제 됐으니까… 앵간한 건 용서해줄테니까, 빨리 고백해요, 로한. 요 며칠 완전 지쳤다고요~”

“잘못이 생기면 상대방한테 살살 아양이나 부려 넘어가려 하는 건, 내가 아니라 죠스케. 너다.”

“...하아!?”

“이 키시베 로한이 누군가에게 한 잘못으로 그렇게 비굴해질 것 같다고 생각한 건가? 어이가 없군…”

“어이, 당신! 지금 나보고 비굴하다는 거지, 그거!”

“난 그냥… 널 기분 좋게 만들어야 할 이유가 있었을 뿐이지.”

“그러니까, 뭔가 잘못한 게 아니면 그 이유가 뭐냐고요!”

씩씩거리며 한 마디씩 해오던 죠스케를 무시하고, 꿋꿋하게 제 할 말을 이어나가던 로한은 이내 입을 닫았다. 그러나, 이내 아무 말 없이 왼손을 죠스케 앞으로 내밀었다.

“...뭔데요, 갑자기. 손이라도 달라고?”

“그래. 손 좀 줘 봐라.”

“그런다고 바로 줄 거라고 생각하는검까? 강아지가 아니라고요!”

“기다리고 있다만.”

“...이상한 짓 하지마요.”

입술이 댓 발 나온 죠스케가 로한의 손 위에 손을 얹었다. 로한은 그 손을 가볍게 잡더니, 이내 반대 손을 주머니에서 꺼냈다. 작지만, 눈부신 무언가가 들려있었다.

“어, 로한…?”

머리 위 샹들리에의 반짝임만큼이나 반짝이는 보석이 찬란하게 빛을 반사했다. 그 반짝임은 이내 죠스케가 내민 왼손의 약지로 향한다. 손가락에 부드럽게 끼워진 반지를 멍하니 바라보다, 죠스케는 고개를 들었다. 로한이 어느 때보다 진지한 표정으로, 반지가 끼워진 손을 조심히 감쌌다. 

“사랑한다, 히가시카타 죠스케. 나와 결혼해다오.”

“...에?”

“보면 모르나? 청혼이다. 죠스케, 대답은.”

“...에!? 다, 당신. 뭐야. 그러니까, 사실은…”

죠스케가 경악에 가득 차 외쳤다.

“나한테 프러포즈 거절당할까봐 무서워서, 이미지 관리한거냐고!!”

“그럴리가 있나, 아니거든!!”

레스토랑의 모두가 다시 한 번 두 사람에게 시선을 돌렸다. 그러다, 몇 초만에 시선이 흩어진다. 이제 저 사람들도 지긋지긋해졌나보다. 그런 건 뇌에 들어오지도 않는 두 사람은 마냥 서로에게 말을 쏟아붓고 있었다.

“그럼 뭔데! 내가 거절할까봐 살살 구슬린거잖아요, 지금까지! 어쩐지 이상하다 했어!!”

“그건 더더욱 아니다. 너한테 거절당할 걱정같은 거, 단 한 번도 한 적 없으니까.”

“거짓말! 그런 걱정이 없는데, 왜 그렇게 잘해준건데요!”

“네가 행복할 때 청혼하고 싶었으니까.”

“그러니까, 그게 그 뜻인게…”

로한이 지금까지 중 가장 깊은 한숨을 쉬었다. 죠스케의 손을 붙잡은 손에 힘이 실린다. 죠스케가 예사롭지 않은 악력에 손을 빼려 움찔거렸지만, 꼼짝도 하지 못했다. 악력 때문이 아닌, 로한이 자신을 바라보는 눈빛에 사로잡혔기 때문에. 고개도 숙이지 못한 채 눈만 돌려 시선을 피했다.

“네가 행복할 때. 결혼한다면 키시베 로한밖에 없다고, 그렇게 생각할 정도로 날 좋아할 때. 바로 그때 청혼하고 싶었다. 행복한 날이 되길 바랐으니까. 문제가 되나?”

“...오, 오우. 그런거면, 말을 하지… …애초에, 그런 거 당연한 건데…”

“뭐가 당연하다는 거냐? 죠스케. 넌 기분이 시시각각 변한다고. 그만큼 기분 변화가 격한 녀석은 본 적이 없-”

“그게 아니라, 그…”

눈을 돌려 시선을 피하던 죠스케가, 이내 결심한 듯 로한과 시선을 맞췄다. 손을 꼼질거리더니, 자신도 로한의 손을 맞잡는다. 이어지는 목소리는 수치심과 부끄러움으로도 가려지지 않는 애정을 담고 있었다. 

“결혼한다면 로한 밖에 없달까, 로한이랑 결혼하고 싶다고나 할까. 그런 거, 애초에 당연하고. 원래부터 그랬다고요…”

테이블에 적막이 흘렀다.. 그러나 두 사람 중 누구도 포크에 손을 대지 않았다. 맞잡은 손을 계속해 잇고 있을 뿐이었다.

“...그러면, 답변은 Yes로 받아들여도 되겠지.”

“그런 셈이죠, 뭐어… …꼬치꼬치 묻지 말라고요.”

맞잡은 손을 움직여, 손가락을 엮는다. 움직임에 따라 반지가 빛을 퍼트린다.

“...남은 디저트, 먹을 건가?”

“으음, 로한이 너무 달달하게 굴어서. 이미 충분한 것 같슴다.”

이내 테이블 위에는 가나슈가 다 굳어버린 퐁당 오 쇼콜라, 형태가 무너져 버린 밀푀유, 슈가파우더처럼 흩어지며 버려진 디저트를 위로하는 샹들리에의 빛만이 남았다. 
`
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=200&auto=format&fit=crop',
    artist: '한',
    name: '가을의 중심에서 외치다.',
    content: `가을은 정말 좋은 계절이었다. 특히 모리오초에서 맞이하는 가을이라면 더욱이었다. 여름처럼 너무 덥지도 않고, 겨울처럼 너무 춥지도 않고, 봄처럼 날씨가 변덕스럽지도 않은, 적당하면서 시원한 온도는 작업하기 좋은 환경을 만들어 주었다. 보통은 필요한 경우가 아니면 밖에 잘 나가지 않는 키시베 로한이었지만, 가을만큼은 조금 달랐다. 왠지 이 시기만큼은 밖에 나왔을 때 오히려 생각이 잘 풀리는 것 같은 느낌이었기 때문이다.

모리오초는 유독 수풀이 우거진, 시골 같은 마을이었다. 그 덕에 9월에서 10월로 넘어갈 즈음이면, 남녀노소 할 것 없이 많은 이들이 단풍을 즐기려 나오곤 했다. 4월의 벚꽃 과는 또 다른, 차분하고 성숙한 정취를 풍겼다.

봄에 자라나고, 여름에 전성기를 이루는 나뭇잎에는 클로로필이라는 성분이 있다. 하지만 가을이 되어 햇빛이 줄어들고 온도가 낮아지면, 나무는 영양분을 만드는 효율이 저하되었다고 판단한다. 이 과정에서 결국 나무는 클로로필을 스스로 분해해서 줄기로 회수해 버리고, 초록색이 사라지게 된다.

초록색 엽록소가 사라지면, 원래 잎 안에 있었지만 초록색에 가려져 보이지 않던 카로티노이드와 크산토필이라는 색소가 모습을 드러낸다. 이것이 우리가 가을에 흔히 보는 노란 은행잎의 정체이다. 어찌 보면 만화에서 주인공이 자신의 '본모습' 을 드러내는 클라이맥스와 닮아있다고 할까.

물론 모리오초의 가을이 이토록 매혹적이라고 해서 매일같이 집을 비우는 것은 아니었다. 굳이 나가지 않아도 창문만 열면 가을의 향취는 충분히 방 안을 가득 채웠고, 무엇보다 만화가는 실내의 정적 속에서 작업을 이어가야 하는 숙명을 타고났기 때문이다.


로한은 지난주 S시에서 트와이닝 브랜드의 퓨어 카모마일 티백 한 상자를 산 사실을 기억했다. 상자를 열고 종이로 된 포장지를 뜯자 카모마일 향기가 코 앞으로 훅 끼쳤다. 수채화 붓으로 대강 꽃을 그린 듯한 찻잔과 접시를 꺼내 잔 안에 티백을 넣고, 실을 손잡이에 두세 번 정도 감아 고정했다. 그리고는 미리 끓여놨던 물을 컵 안에 붓자, 은은하게 퍼졌던 향이 점점 컵 안에서 수증기가 피어오르며 코 안에 자기주장을 강하게 때려 넣기 시작했다. 로한은 그 주장을 긍정적으로 받아들였다.

뜨거운 찻잔을 들고 2층으로 이어지는 계단을 오르자, 나무 특유의 삐걱이는 소리가 집 안을 울렸다. 목조 주택의 전형적인 특징이었다. 특히 가을처럼 건조해지기 시작하는 계절에는 나무가 수축하면서 부재 사이에 틈이 생기기 마련인데, 이로 인해 계단에서 날카로운 마찰음이 발생하는 것이었다.

작업실 문을 열었을 때, 종이와 잉크의 싸한 냄새가 손에 들고 있는 카모마일 차 향과 충돌하며 특이한 조합을 이루었다. 책상 앞으로 몸을 옮긴 후, 제도판 뒤쪽에 찻잔을 놓았다. 이제 본격적으로 자리에 앉아 작업을 시작할 시간이었다.

여느 때와 같이 손 풀기 동작은 필수였다. 손은 만화가에게 있어 생명과 같다. 머리가 아무리 잘나도, 모든 것을 꿰뚫어 보는 눈을 가졌어도, 손이 움직이지 않으면 만화는 그려질 수 없다. 로한에게 이는 차를 탔을 때 안전벨트를 매는 것과 같은 양상이다.

기지개까지 시원하게 한 번 켜고, 드디어 잉크통에 펜을 찍으려던 그 순간이었다.

띵동-

'음?'

로한은 펜을 든 손을 멈췄다. 

'이 시간에 누구지? 택배인가? 아니, 마지막으로 시킨 택배는 이미 집에 있는데.'

쾅쾅-

세차게 문을 두드리는 기분 나쁜 소리가 났다.

"로한!! 안에 있어?!"

이 목소리는, 히가시카타 죠스케? 저 녀석이 무슨 일이지? 목소리 톤이나, 문 두들기는 소리의 크기를 따졌을 때, 죠스케는 격양된 상태인 것 같았다. 하지만 나, 이 키시베 로한이 가장 싫어하는 것 중 하나는 비효율적인 것이었다. 코이치 군도 짜증 나게도 이미 잔뜩 짜증 나 있는 죠스케를 상대할 이유는 없었다. 가볍게 죠스케를 무시하고 펜을 잉크병에 찍은 후 입구에 펜촉을 가볍게 긁었다.

"일부러 대답 안 하는 거 다 알아!!"
'시끄럽군..'

정말이지, 대낮부터 소란을 피우는 남자 고등학생이라니. 하지만 계속 침묵을 유지하다 보면 적당히 떠날 것이다. 아니, 그래야만 한다. 죠스케는 어디로 튈 지 모르는, 예측할 수 없는 놈이니까.

"그래, 이렇게 나오시겠다 이거지?"

로한은 최대한 아랑곳하지 않고 작업에 열중하려 했다. 하지만 어쩌면, 정말 어쩌면 로한은 이때부터 이미 어느 정도는 예상했을 것이다..

"도라!!!"

무의식 속 한구석에 밀어 넣었던 불안이 현실로, 그것도 자연재해마냥 오는 것은 순식간이었다. 발 밑에서 느껴지는 진동과 함께 콰드득- 하는 파열음이 집 안에 울려 퍼지더니, 이윽고 로한의 책상까지 충격이 오는 것은, 아마 1초도 걸리지 않았을 것이다. 

의자에 앉아 있던 로한의 몸이 왼쪽으로 크게 휘청였다. 펜을 쥔 손끝에 걸려 있던 섬세한 감각은 죠스케가 일으킨 진동 앞에 허망하게 흩어졌다. 하지만 로한의 신경을 더 날카롭게 자극한 것은 자신의 몸이 겪는 굴욕보다, 제도판 너머에서 들려온 찰랑 하는 불길한 소리였다.

이런 식의 변수가 일어날 거라고는 전혀 생각지 못하고 제도판 뒤에 두었던 찻잔에 담긴 카모마일 차가, 방금의 충격으로 인해, 원고지 위쪽의 모서리 부분부터 적시면서 점점 내려오고 있었던 것이다!!

"아!!!!!!!!!!!!"

로한은 놀란 감정을 참지 못하고 입으로 표출해 버렸다. 급히 원고지를 제도판에서 들어냈지만, 로한의 스탠드는 크레이지 다이아몬드가 아니기에, 엎질러진 물을 다시 컵 안에 들어가게 할 수는 없다.. 손을 부들부들 떨며 로한은 죠스케에 대한 분노를 꾹꾹 눌러 담았다.

'망할 죠스케 녀석, 반드시 대가를 치르게 해 주겠다..'


-

드디어 2층 작업실 문이 열렸다. 로한의 얼굴에는 감정이 드러나지 않았으나, 죠스케는 로한을 본 순간 본능적으로 알았다. 방금 자신의 행동으로 인해 신경질이 난 상태라는 것을. 아까의 감정 섞인 비명도 그렇고, 분명 로한의 작업을 망쳤을 거라는 것을..

로한은 말없이 서서히 계단을 내려왔다. 1층 현관의 풍경은 아무 일도 없었다는 듯이 멀쩡했다. 분명 죠스케가 문을 부수고 난 후 크레이지 다이아몬드로 고쳤을 것이다. 로한은 계단이 왼쪽으로 꺾이는 지점에서 서너 칸 정도 위에 멈춰 섰다. 그러고는 팔짱을 끼고 삐딱하게 서서 죠스케를 노려보았다. 무슨 용건인지 어디 한 번 들어나 보자는 의미였다.

"궁금한 게 있어서 찾아 왔슴다."
"그게 무엇이지?"
"사람들은.. 사람들은 대체 왜 그러는 검까? 왜 남 일에 그렇게 관심이 많냐고!"
"......"

로한은 눈을 감고 미간을 짚었다. 겨우 그런 이유로, 이 키시베 로한의 위대한 작업을 방해하면서까지 찾아온 건가..

"난 진지하다니까??"

로한은 한숨을 쉬기만 할 뿐, 말이 없었다.

"나한테는 중요한 문제라고! 댁한테는 모르겠지만, 이런 걸 물어볼 만한 사람이 로한밖에 없었단 말야!"
"왜 이 질문이 나한테만 물어볼 수 있다고 생각한 거지?"

로한은 이해할 수 없다는 듯 죠스케를 보았다. 죠스케는 로한의 말에 잠시 머뭇거리더니, 눈을 질끈 감았다. 그리고는 결심한 듯 입을 열기 시작했다.

"이젠 의지할 수 있는 죠타로 씨도 없고, 코이치나 오쿠야스한테 물어봤자 만족할 만한 답을 얻을 수 없을 것 같았어."
"흠?"

죠스케는 로한에게서 고개를 돌린 채로, 목 뒤를 만지며 말을 이어갔다.

"그나마 로한은 객관적이고, 그래도 나보다.. 4년은 더 살았으니까. 그리고 스탠드 능력도 헤븐즈 도어, 사람의 마음을 읽어내잖아? 왠지 사람 심리에 대해서 나보다는 잘 알 것 같았어.."
"웬일로 솔직하군."
"아무튼 그래서 댁한테 온 거야. 불쑥 찾아온 것에 대해서는... 뭐, 죄송함다."
"사과하는 사람의 태도가 아닌데. 미안하다고 하면 다인가?"
"..."
"난 네가 크레이지 다이아몬드로 우리 집 문을 부숴준 덕분에, 그 물리적 충격으로 작업을 망쳤다. 내 소중한 원고에 대해서는 어떻게 책임질 생각이지?"
"그건 내 크레이지 다이아몬드로-"
"아니, 네 스탠드로 젖은 종이를 고친다고 해서 다 해결되는 문제가 아니란 말이다! 내 작업의 평화로운 시간과 과정을 망친 것은 어떻게 할 거냐는 말이었다."
"...."

죠스케는 할 말을 잃었다. 그는 혼나는 강아지마냥, 풀이 죽은 채로 아래를 내려다보았다.

"하지만, 그 인간 본성에 대한 질문, 그건 좀 흥미롭긴 하군. 들은 직후에는 기가 찼었지만."

로한이 턱 밑에 손을 대고서 생각하는 표정으로 말했다.

"정말임까?"
"아마 네가 그런 생각을 하게 된 데에는 누군가가 또 헤어스타일 욕을 했나 보지?"

죠스케는 로한의 말에 잠시나마 풀렸던 감정이 다시 솟구치기 시작했다.

"맞아! 그 망할 아줌마들 때문이야. 갑자기 날 보고는 수군거리면서 안 좋은 표정으로 보더라니까. 직접적으로 내 머리에 대한 욕을 한 건 아니었지만, 시선 위치며, 내가 쳐다봤을 때 눈을 피하는 것이며, 딱 봐도 느낌이 헤어스타일을 보고 말하는 것 같았어!"
"흐음."
"안 그래도 예전부터 궁금했던 것이기도 하고. 왜 내 머리를 보고 그렇게 관심이 많은지 모르겠다니까! 지들 일에나 신경 쓰면서 살 것이지."
"죠스케, 넌 왜 네 머리에 대한 욕을 들었을 때 왜 감정이 폭발하는지 알고 있나?"

로한의 눈빛이 사뭇 진지해졌다.

"모르지! 그저 이 자랑스러운 머리스타일을 욕하면 화가 치밀어 오르는 걸!"
"진짜 긍지를 가진 자는 타인의 비웃음에 분노하지 않는다."

죠스케는 이해할 수 없다는 듯 로한을 보았다.

"네가 주먹을 휘두르는 건, 역설적이게도 '나도 내 머리가 좀 유별나다는 걸 알고 있다'는 자격지심을 감추기 위한 과잉 보상에 불과하다."
"뭐야?!"
"너도 네 헤어스타일이 주변에서 겉돈다는 것을 무의식적으로 알고 있을 거다. 그래서 그것을 방어하기 위해 오히려 더 과장된 태도를 취하는 거지."
"당신이 뭘 안다고...!"

죠스케의 낮은 목소리가 공기 중을 짓눌렀다. 하지만 로한은 오히려 차갑게 가라앉은 눈으로 그를 응시했다.

"내가 아는 건 하나다, 죠스케. 나 역시 매일 수만 명의 독자들에게 난도질당하며 살고 있다는 거지. 내 원고의 한 칸, 대사 한 줄을 두고 그들은 제멋대로 떠들어대. 하지만 내가 그들의 수군거림이 무서워 펜을 멈춘 적이 있나?"

로한이 계단을 한 칸 내려오면서 말했다.

"사람들이 남 일에 관심이 많은 이유는 단 하나야. 제 삶이 그만큼 공허하기 때문이지. 자신의 삶에서 리얼리티를 찾지 못한 패배자들이 타인의 삶을 깎아내려 평등해지려는 비겁한 발버둥일 뿐이다. 이를 심리학계에서는 사회적 정체성 이론이라 부르더군. 죠스케, 네가 진정으로 화를 내야 할 대상은 그들이 아니라, 그들의 값싼 혀 놀림에 흔들리고 있는 네 나약한 자존심이다."
"..."
"타인의 말에 분노한다는 건, 네 감정의 주도권을 그들에게 넘겨줬다는 뜻이다. 네가 그 머리에 담은 은인에 대한 긍지가 진짜라면, 왜 고작 지나가는 행인의 수군거리는 소리에 그 가치를 의심받으려 하지? 진정한 긍지는 타인의 허락이 필요 없는 법이다."

죠스케는 정곡을 찔린 듯 말없이 로한을 바라보았다.

"물론 진짜 억울한 건 이거겠지. 남 일에 참견하는 본능은 그렇다 쳐도, 왜 하필 네 머리를 볼 때 안 좋게 생각하는지에 대해.."
"...맞아."
"그 현상은 고정관념과 인지적 휴리스틱으로 설명할 수 있다."
"휴리... 뭐?"
"넌 뇌가 생각하는 데 엄청난 에너지를 쏟는다는 것을 알고 있나? 아, 교양이 부족한 널 위해 쉽게 설명해 주지. 인간의 뇌는 생각보다 아주 게으른 기관이다. 몸무게의 2%밖에 안 되는 주제에 몸 전체 에너지의 20%를 가져다 쓰지. 그래서 뇌는 늘 에너지를 아끼려 든다. 누군가를 만났을 때, 그 사람의 성격이나 본질을 깊게 탐구하는 복잡한 과정 대신, 아주 빠르고 간편한 판단... 즉 휴리스틱을 선호하는 거지."
"그래서?"
"사람들은 너라는 인간의 본질을 파악할 만큼 부지런하지 않아. 70년대 불량배들이나 하던 그 철 지난 리젠트 머리를 보면 자동적으로 불량 학생이라는 낡은 고정관념을 꺼내 쓰는 편이 뇌의 입장에선 훨씬 편하고 경제적이니까. 네가 화를 내는 건, 그들의 게으른 뇌 구조에 대항하려는 무의미한 몸부림일 뿐이다."
"윽.."
"하지만 나 역시 타인의 본질을 들여다보려는 노력조차 하지 않은 채, 그저 얄팍한 고정관념에 기대어 남의 인생을 난도질하는 그 꼴을 보면... 무식하다고 생각한다."

죠스케는 예상치 못한 로한의 동조에 눈을 크게 떴다.

"어... 로한도 그렇게 생각함까?"

"당연하지. 그건 리얼리티에 대한 모독이자 지적 나태함의 극치다. 뇌가 에너지를 아끼려 한다는 건, 결국 그들이 생각하기를 포기한 생물이라는 증거거든. 그런 자들이 내뱉는 평가를 네 소중한 긍지와 맞바꾸려 들다니, 죠스케. 넌 내 생각보다 더 멍청했던 모양이군."
"허. 참나."

죠스케는 어이없어하면서도, 작게 웃었다.

"나 키시베 로한 역시, 내 만화를 읽지도 않고 겉모습만으로 평가하는 무식한 자들의 목소리는 가차 없이 쓰레기통에 처박아버린다. 그들이 떠들어대는 건 공사장의 소음보다 들어줄 게 못 되니까."
"로한과 나는 전혀 맞는 게 없을 거라 생각했는데, 이런 부분에서는 또 맞는 게 신기함다."
"착각하지 않는 것이 좋을 거다.."
"전 그래도 로한 선생님과 어색하게 지내고 싶진 않다고요~"
"어색하게 지내고 싶지 않다면서 우리 집에 무단침입을 한단 말인가?"
"아이~ 그건 실수!"
"퍽이나 실수겠다."
"저도 제가 생각했던 것보다 힘이 세게 나갔단 말임다. 원래는 깔끔하게 문만 손보려 했는데, 문 주변 벽까지 부서지는 건 생각 범위 밖이었다고요."
"넌 감정 조절하는 법을 필히 배워야 할 것 같군.."
"아하하.."

죠스케는 머쓱한듯 머리 뒤를 긁었다.

"감정 조절은 인간과의 관계에 있어 필수 요소다. 소년 만화에서 주인공이 성장을 필히 겪는 것처럼 말이지. 지나가는 사람이든, 친구든, 연인이든, 배우자든.. 가깝거나, 가까워지려 하는 사람일수록, 감정 조절이 중요한 거다, 죠스케."
"명심하겠슴다."
"이제 됐으니까 나가봐."

로한은 죠스케가 귀찮다는 듯 손짓하며 말했다.

"네~ 네~ 또 오겠슴다!"
"누가 또 와도 된다 했지?"
"감정 조절 해서 다시 오면 되잖슴까~"
"그래도 넌 사절이다."

죠스케는 로한의 말에 대답하지 않고 가버렸다. 한바탕 소동이 있고 난 후에는, 벌써 가을 해가 뉘엿뉘엿 지고 있었다.

"시간을 낭비했군.. 하지만, 인간 심리와 본성. 내 만화에 더 녹여내면 좋은 소재가 되겠어."
`
  }
];

const LOVE_MESSAGES: string[] = [
  "Wishing you a lifetime of happiness!",
  "To the most beautiful couple, may your love grow every day.",
  "So happy to share this special day with you both.",
  "Cheers to love, laughter, and happily ever after!",
  "May your journey together be filled with sweet adventures.",
  "You two are a match made in heaven.",
  "Warmest congratulations on your wedding!",
  "May the years ahead be filled with lasting joy.",
  "Stay blessed and keep shining together.",
  "Beautiful wedding, even more beautiful couple.",
  "Love is patients, love is kind. May yours be eternal.",
  "Today is the beginning of a wonderful story.",
  "Sending you so much love today and always.",
  "May your home be full of laughter and hearts full of love."
];

// --- Components ---

const ViewWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="w-full h-full min-h-screen flex flex-col overflow-hidden"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [view, setView] = useState<View>('entry');
  const [selectedArt, setSelectedArt] = useState<ArtItem | null>(null);
  const [selectedNovel, setSelectedNovel] = useState<NovelItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleBubbles, setVisibleBubbles] = useState<LoveMessage[]>([]);

  // Initialize art and novel selection
  useEffect(() => {
    if (view === 'art' && !selectedArt) setSelectedArt(ART_DATA[0]);
    if (view === 'novel' && !selectedNovel) setSelectedNovel(NOVEL_DATA[0]);
  }, [view]);

  // Bubble loading logic for Love page
  useEffect(() => {
    if (view === 'love') {
      const initial = LOVE_MESSAGES.slice(0, 8).map((m, i) => ({
        id: i.toString(),
        text: m,
        side: i % 2 === 0 ? 'left' : ('right' as 'left' | 'right'),
        sender: `Guest_${i + 1}`
      }));
      setVisibleBubbles(initial);
    }
  }, [view]);

  const handleScroll = () => {
    if (view !== 'love' || !scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (visibleBubbles.length < LOVE_MESSAGES.length) {
        const nextIdx = visibleBubbles.length;
        const nextMessage: LoveMessage = {
          id: nextIdx.toString(),
          text: LOVE_MESSAGES[nextIdx],
          side: nextIdx % 2 === 0 ? 'left' : 'right',
          sender: `Guest_${nextIdx + 1}`
        };
        setVisibleBubbles(prev => [...prev, nextMessage]);
      }
    }
  };

  const navigateTo = (newView: View) => {
    setView(newView);
    setSelectedArt(null);
    setSelectedNovel(null);
  };

  return (
    <div className="relative w-full h-full min-h-screen content-selection-none overflow-x-hidden">
      <AnimatePresence mode="wait">
        {/* ENTRY PAGE */}
        {view === 'entry' && (
          <ViewWrapper key="entry">
            <div className="flex flex-col items-center justify-center flex-grow bg-wedding-pattern relative">
              {/* Overlay to ensure readability */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center space-y-8 relative z-10"
              >
                <div className="space-y-2">
                  <h1 className="text-7xl md:text-8xl font-serif font-light tracking-[0.2em] text-wedding-ink uppercase">THE ETERNAL</h1>
                  <p className="text-sm uppercase tracking-[0.6em] text-wedding-gold font-medium">Art · Novel · Love</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('menu')}
                  className="group relative px-12 py-4 overflow-hidden border border-wedding-gold rounded-full transition-all duration-300"
                  id="enter-button"
                >
                  <span className="relative z-10 text-sm tracking-widest uppercase text-wedding-ink group-hover:text-white transition-colors duration-300">Enter Experience</span>
                  <div className="absolute inset-0 bg-wedding-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </motion.button>
              </motion.div>
              <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] opacity-40">Estd. 2024 · All Rights Reserved</div>
            </div>
          </ViewWrapper>
        )}

        {/* MENU PAGE */}
        {view === 'menu' && (
          <ViewWrapper key="menu">
            <div className="flex flex-col items-center justify-center flex-grow p-6 bg-wedding-pattern relative overflow-hidden">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <h2 className="text-4xl font-serif mb-12 italic text-wedding-ink/80 tracking-wide">Choose a Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl px-12">
                {[
                  { id: 'art', label: 'Art', icon: Palette, color: 'bg-[#E5E1DA]', number: '01' },
                  { id: 'novel', label: 'Novel', icon: BookOpen, color: 'bg-[#D4CFB4]', number: '02' },
                  { id: 'love', label: 'Love', icon: Heart, color: 'bg-[#F2E5D7]', number: '03' }
                ].map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigateTo(item.id as View)}
                    className="group flex flex-col items-center space-y-6"
                    id={`menu-${item.id}`}
                  >
                    <div className={`w-full h-80 rounded-xl overflow-hidden border border-white shadow-lg transition-all duration-500 relative flex items-center justify-center ${item.color}`}>
                      <div className="absolute inset-0 bg-wedding-gold opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500"></div>
                      <div className="serif text-6xl opacity-10 font-serif translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.number}</div>
                      <item.icon className="absolute w-10 h-10 text-wedding-gold/40 group-hover:text-wedding-gold transition-colors duration-500" />
                    </div>
                    <span className="font-serif italic text-3xl tracking-wide group-hover:text-wedding-gold transition-colors duration-300">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </ViewWrapper>
      )}

        {/* ART PAGE */}
        {view === 'art' && (
          <ViewWrapper key="art">
            <div className="flex flex-col h-screen overflow-hidden bg-wedding-cream">
              <Header title="Art Gallery" onBack={() => navigateTo('menu')} />
              <div className="flex flex-1 overflow-hidden">
                {/* Gallery Index Sidebar */}
                <div className="w-1/4 h-full border-r border-wedding-gold/20 p-6 flex flex-col space-y-4 bg-white/30 overflow-y-auto no-scrollbar">
                  <div className="mb-4 px-2 py-1 border-b border-wedding-gold/40">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60">Gallery Index</span>
                  </div>
                  <div className="space-y-4">
                    {ART_DATA.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedArt(item)}
                        className={`aspect-square rounded-lg cursor-pointer transition-all duration-500 overflow-hidden shadow-sm ${
                          selectedArt?.id === item.id ? 'ring-2 ring-wedding-gold opacity-100' : 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0'
                        }`}
                      >
                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 flex overflow-hidden">
                  <AnimatePresence mode="wait">
                    {selectedArt && (
                      <motion.div
                        key={selectedArt.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex w-full h-full"
                      >
                        {/* Center: Image Viewer */}
                        <div className="w-1/2 md:w-[60%] h-full p-8 md:p-12 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setIsZoomed(true)}
                            className="w-full max-w-xl aspect-[4/5] bg-[#E5E1DA] shadow-2xl rounded-2xl relative overflow-hidden flex items-center justify-center group cursor-zoom-in"
                          >
                            <img 
                              src={selectedArt.image} 
                              alt={selectedArt.name} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-widest font-medium">Click to Enlarge</span>
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Right: Info Area */}
                        <div className="flex-1 h-full p-8 md:p-12 flex flex-col justify-end space-y-6 bg-white/20 border-l border-wedding-gold/10">
                          <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                          >
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase tracking-tighter text-wedding-gold font-bold">Artist</p>
                              <h2 className="text-3xl font-serif">{selectedArt.artist}</h2>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase tracking-tighter text-wedding-gold font-bold">Work Name</p>
                              <p className="text-2xl font-serif italic">{selectedArt.name}</p>
                            </div>

                            <div className="h-px w-12 bg-wedding-gold/30 my-4" />
                            
                            <p className="text-sm text-wedding-ink/70 leading-relaxed font-sans max-w-xs">
                              {selectedArt.description}
                            </p>

                            <button 
                              onClick={() => navigateTo('menu')}
                              className="pt-8 text-[10px] uppercase tracking-[0.3em] text-wedding-ink hover:text-wedding-gold transition-colors text-left flex items-center gap-2 group"
                            >
                              <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
                              Return to Menu
                            </button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Zoom Modal */}
            <AnimatePresence>
              {isZoomed && selectedArt && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-20"
                  onClick={() => setIsZoomed(false)}
                >
                  <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                    <X size={32} />
                  </button>
                  <motion.img
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    src={selectedArt.image}
                    alt={selectedArt.name}
                    className="max-w-full max-h-full object-contain rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </ViewWrapper>
        )}

        {/* NOVEL PAGE */}
        {view === 'novel' && (
          <ViewWrapper key="novel">
            <div className="flex flex-col h-screen overflow-hidden bg-wedding-cream">
              <Header title="Literary Archive" onBack={() => navigateTo('menu')} />
              <div className="flex flex-1 overflow-hidden">
                {/* Index Sidebar */}
                <div className="w-1/5 h-full border-r border-wedding-gold/20 p-6 space-y-6 bg-white/30 overflow-y-auto no-scrollbar">
                  <div className="mb-4 px-2 py-1 border-b border-wedding-gold/40">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-wedding-ink/60">Novels</span>
                  </div>
                  {NOVEL_DATA.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedNovel(item)}
                      className={`aspect-[3/4] rounded-lg cursor-pointer transition-all duration-500 overflow-hidden shadow-sm relative ${
                        selectedNovel?.id === item.id ? 'ring-2 ring-wedding-gold opacity-100' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                      }`}
                    >
                      <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Main Text Content */}
                <div className="w-3/5 h-full p-12 md:p-24 flex flex-col justify-start overflow-y-auto scroll-smooth custom-scrollbar bg-white shadow-inner">
                  <AnimatePresence mode="wait">
                    {selectedNovel && (
                      <motion.div
                        key={selectedNovel.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <h3 className="text-4xl md:text-5xl font-serif mb-16 italic text-wedding-ink tracking-tight">Chapter I: {selectedNovel.name}</h3>
                        <div className="space-y-12 leading-loose text-wedding-ink/80 text-xl font-light font-serif">
                          {selectedNovel.content.split('\n\n').map((para, pidx) => (
                            <p key={pidx} className="indent-12">{para}</p>
                          ))}
                        </div>
                        <div className="mt-20 text-center">
                          <Heart className="w-6 h-6 text-wedding-gold/20 mx-auto" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Right: Info Sidebar */}
                <div className="w-1/5 h-full p-10 flex flex-col justify-end bg-white/20 border-l border-wedding-gold/20">
                  <AnimatePresence mode="wait">
                    {selectedNovel && (
                      <motion.div
                        key={selectedNovel.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-tighter text-wedding-gold font-bold">Author</p>
                          <h2 className="text-2xl font-serif">{selectedNovel.artist}</h2>
                        </div>
                        <button 
                          onClick={() => navigateTo('menu')}
                          className="pt-8 text-[10px] uppercase tracking-[0.3em] text-wedding-ink hover:text-wedding-gold transition-colors flex items-center gap-2 group"
                        >
                          <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
                          Return
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </ViewWrapper>
        )}

        {/* LOVE PAGE */}
        {view === 'love' && (
          <ViewWrapper key="love">
            <div className="flex flex-col h-screen bg-[#FDFBF7]">
              <div className="h-16 w-full flex items-center justify-between px-10 glass shrink-0 z-40">
                <span className="font-serif italic text-xl text-wedding-ink">Messages of Affection</span>
                <button 
                  onClick={() => navigateTo('menu')}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-wedding-gold hover:text-wedding-ink transition-colors"
                >
                  Exit Gallery
                </button>
              </div>
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-6 py-12 md:px-20 space-y-8 no-scrollbar"
              >
                <div className="max-w-4xl mx-auto space-y-10">
                  <AnimatePresence initial={false}>
                    {visibleBubbles.map((msg, idx) => (
                      <motion.div
                        key={`${msg.id}-${idx}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.side === 'left' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[85%] md:max-w-[65%] ${
                          msg.side === 'left' 
                            ? 'p-6 rounded-2xl rounded-bl-none bg-white border border-wedding-gold/10 text-wedding-ink shadow-sm' 
                            : 'p-6 rounded-2xl rounded-br-none bg-wedding-gold text-white shadow-md'
                        } font-sans text-sm md:text-base leading-relaxed`}>
                          <p className="font-light">"{msg.text}"</p>
                          <div className={`mt-3 text-[10px] uppercase tracking-widest font-bold ${
                            msg.side === 'left' ? 'text-wedding-gold' : 'text-white/60'
                          }`}>
                            — {msg.sender}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {visibleBubbles.length === LOVE_MESSAGES.length && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <p className="font-serif italic text-wedding-gold/40 text-xl">Love is the silent architecture of the soul.</p>
                      <div className="mt-6">
                        <Heart className="w-8 h-8 text-wedding-gold/20 mx-auto" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="h-10" />
                </div>
              </div>
            </div>
          </ViewWrapper>
        )}
      </AnimatePresence>

      {/* GLOBAL NAVIGATION INDICATOR (for when inside sections) */}
      <AnimatePresence>
        {view !== 'entry' && view !== 'menu' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-8 right-8 z-40 hidden md:block"
          >
            <div className="flex gap-4 p-2 bg-white/80 backdrop-blur-md rounded-full border border-wedding-gold/10 shadow-lg px-4">
              {['art', 'novel', 'love'].map((v) => (
                <button
                  key={v}
                  onClick={() => navigateTo(v as View)}
                  className={`px-3 py-1 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-full ${
                    view === v ? 'bg-wedding-gold text-white' : 'text-wedding-gold hover:bg-wedding-cream'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Helper Components ---

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="w-full py-6 px-4 md:px-8 bg-white/60 backdrop-blur-md border-b border-wedding-gold/10 flex items-center justify-between z-30 shadow-sm relative">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-wedding-ink hover:text-wedding-gold transition-colors uppercase text-[10px] tracking-[0.3em] font-bold"
      >
        <ArrowLeft size={14} />
        Back
      </button>
      <h2 className="text-xl md:text-2xl font-serif text-wedding-ink absolute left-1/2 -translate-x-1/2 tracking-wide font-medium italic">
        {title}
      </h2>
      <div className="w-16" /> {/* Spacer */}
    </header>
  );
}
