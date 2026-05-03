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
    artist: 'Isabella Grant',
    name: 'The Silk Ribbon',
    content: `The ribbon was more than just a piece of silk; it was a thread connecting lives that had once been parallel but were now irrevocably intertwined. She remembered the day she found it, tucked inside an old cedar chest, smelling of lavender and history. \n\n"It belongs to the bride," her grandmother had said, her eyes twinkling with a secret only the truly lived could keep. "It has seen a thousand smiles and carried a thousand hopes." \n\nAs the dawn broke over the rolling hills of the countryside, the silk ribbon felt cool against her skin, a gentle reminder that love is not just a destination, but a patient, winding road that leads us exactly where we need to be. Every stitch, every fray, every soft shimmer told a story of resilience and the quiet strength of two souls becoming one.`
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1510674485131-dc88d96369b4?q=80&w=200&auto=format&fit=crop',
    artist: 'Arthur Vance',
    name: 'Echoes at Midnight',
    content: `Midnight in the garden was always silent, save for the whispers of the willow trees. They were waiting for the clock to strike twelve—the moment when everything changed. It wasn't the ceremony they anticipated, but the silence that followed, where words were no longer necessary. \n\n"I knew it since the first day," he whispered, breaking the stillness. "Not because of the grand gestures, but because of how you looked when no one else was watching." \n\nThe stars above seemed to shine with a renewed intensity, as if witnessing a truth that had been hidden in the shadows for too long. In that moment, the weight of the past evaporated, leaving only the clear, bright future of their shared breath.`
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
