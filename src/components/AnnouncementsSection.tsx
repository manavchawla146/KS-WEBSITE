"use client";

import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ExternalLink, ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interface ---
interface Announcement {
  _id: string;
  title: string;
  description?: string;
  category: string;
  url?: string;
  isNewAnnouncement: boolean;
  createdAt: string;
}

// --- Card Component ---
const AnnouncementCard = ({ item }: { item: Announcement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const serverBaseUrl = "https://ks-server-hqsn.onrender.com";
  const fileUrl = item.url ? `${serverBaseUrl}${item.url}` : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group bg-white p-5 border border-black/10 rounded-lg hover:border-black/20 hover:shadow-md transition-all duration-300 relative flex flex-col"
    >
      {item.isNewAnnouncement && (
        <div className="absolute top-4 right-4 bg-accent text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">
          New
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] font-medium text-black/40 uppercase tracking-wider">
              {formatDate(item.createdAt)}
            </span>
            <span className="h-1 w-1 rounded-full bg-black/20" />
            <span className="font-mono text-[9px] font-bold text-accent uppercase tracking-wider">
              {item.category}
            </span>
          </div>
          <h4 className="text-base font-display font-bold text-black leading-tight pr-12">
            {item.title}
          </h4>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && item.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-2 border-t border-black/5 mt-3">
              <p className="text-sm text-black/70 font-body leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5 mt-3">
        {item.description ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-black/60 hover:text-black transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
              {isExpanded ? 'Hide Details' : 'Read More'}
            </span>
            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={12} />
            </motion.span>
          </button>
        ) : (
          <div />
        )}

        {fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-accent hover:text-black transition-colors group/link"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold group-hover/link:underline">
              View Document
            </span>
            <ExternalLink size={10} />
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-black/30">
             <FileText size={10} />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              No attachment
            </span>
          </span>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Section ---
const AnnouncementsSection = () => {
  const [generalItems, setGeneralItems] = useState<Announcement[]>([]);
  const [mbaItems, setMbaItems] = useState<Announcement[]>([]);
  const [mscItems, setMscItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const activeColumnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      const el = activeColumnRef.current;
      if (!el) return;
      e.preventDefault();
      el.scrollTop += e.deltaY;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const el = activeColumnRef.current;
      if (!el) return;
      const touchY = e.touches?.[0]?.clientY ?? 0;
      const delta = touchStartY - touchY;
      e.preventDefault();
      el.scrollTop += delta;
      touchStartY = touchY;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    const onPop = () => {
      activeColumnRef.current = null;
      unlockBodyScroll();
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        activeColumnRef.current = null;
        unlockBodyScroll();
      }
    };

    window.addEventListener('popstate', onPop);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('wheel', onWheel as any);
      window.removeEventListener('touchstart', onTouchStart as any);
      window.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('popstate', onPop as any);
      document.removeEventListener('visibilitychange', onVisibility as any);
      unlockBodyScroll();
    };
  }, []);

  const lockBodyScroll = () => {
    try {
      const scrollY = window.scrollY || window.pageYOffset;
      (document as any).__scrollY = scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      // preserve padding on html and body
      if (scrollbarWidth > 0) {
        (document as any).__prevBodyPaddingRight = document.body.style.paddingRight;
        (document as any).__prevHtmlPaddingRight = document.documentElement.style.paddingRight;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      }

      // capture fixed elements and add padding to them so header doesn't shift
      const fixedEls: Element[] = [];
      document.querySelectorAll('*').forEach((el) => {
        try {
          const st = getComputedStyle(el as Element);
          if (st.position === 'fixed') fixedEls.push(el);
        } catch {}
      });
      if (fixedEls.length) {
        (document as any).__fixedPrev = [];
        fixedEls.forEach((el) => {
          const prev = (el as HTMLElement).style.paddingRight || '';
          (document as any).__fixedPrev.push({ el, prev });
          (el as HTMLElement).style.paddingRight = `${scrollbarWidth}px`;
        });
      }

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } catch {}
  };

  const unlockBodyScroll = () => {
    try {
      const prev = (document as any).__scrollY || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if ((document as any).__prevBodyPaddingRight !== undefined) {
        document.body.style.paddingRight = (document as any).__prevBodyPaddingRight || '';
        delete (document as any).__prevBodyPaddingRight;
      } else {
        document.body.style.paddingRight = '';
      }
      if ((document as any).__prevHtmlPaddingRight !== undefined) {
        document.documentElement.style.paddingRight = (document as any).__prevHtmlPaddingRight || '';
        delete (document as any).__prevHtmlPaddingRight;
      } else {
        document.documentElement.style.paddingRight = '';
      }

      // restore fixed elements' padding
      if ((document as any).__fixedPrev) {
        ((document as any).__fixedPrev as Array<any>).forEach((rec: any) => {
          try {
            (rec.el as HTMLElement).style.paddingRight = rec.prev || '';
          } catch {}
        });
        delete (document as any).__fixedPrev;
      }

      window.scrollTo(0, prev);
      delete (document as any).__scrollY;
    } catch {}
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const baseUrl = '/api/announcements/all';

        const [genRes, mbaRes, mscRes] = await Promise.all([
          fetch(`${baseUrl}/General`),
          fetch(`${baseUrl}/MBA`),
          fetch(`${baseUrl}/MSCIT`)
        ]);

        const parseData = async (res: Response) => {
          try {
            const data = await res.json();
            // support multiple possible response shapes
            if (Array.isArray(data)) return data;
            if (Array.isArray(data.announcement)) return data.announcement;
            if (Array.isArray(data.announcements)) return data.announcements;
            if (Array.isArray(data.data)) return data.data;
            // sometimes API nests under a 'result' or similar
            for (const key of ['result', 'items', 'payload']) {
              if (Array.isArray((data as any)[key])) return (data as any)[key];
            }
            return [];
          } catch (err) {
            console.warn('Failed to parse announcements response', err);
            return [];
          }
        };

        setGeneralItems(await parseData(genRes));
        setMbaItems(await parseData(mbaRes));
        setMscItems(await parseData(mscRes));

      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  const sortItems = (items: Announcement[]) => {
    return [...items].sort((a, b) => {
      if (a.isNewAnnouncement && !b.isNewAnnouncement) return -1;
      if (!a.isNewAnnouncement && b.isNewAnnouncement) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const renderColumn = (title: string, subtitle: string, items: Announcement[], emptyText: string) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6 flex-shrink-0">
        <div>
          <h3 className="font-display font-bold text-xl text-black">{title}</h3>
          <p className="font-mono text-[9px] text-black/40 uppercase tracking-widest">{subtitle}</p>
        </div>
        <span className="font-mono text-[10px] font-bold text-black/20">{items.length} Updates</span>
      </div>

      <div
        className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar"
        style={{ maxHeight: '600px', overscrollBehavior: 'contain', touchAction: 'none' }}
        onMouseEnter={(e) => {
          activeColumnRef.current = e.currentTarget as HTMLElement;
          lockBodyScroll();
        }}
        onMouseLeave={() => {
          activeColumnRef.current = null;
          unlockBodyScroll();
        }}
        onTouchStart={(e) => {
          activeColumnRef.current = e.currentTarget as HTMLElement;
          lockBodyScroll();
        }}
        onTouchEnd={() => {
          activeColumnRef.current = null;
          unlockBodyScroll();
        }}
      >
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-black/5 rounded-lg animate-pulse" />)}
          </div>
        ) : items.length > 0 ? (
          sortItems(items).map((item) => (
            <AnnouncementCard key={item._id} item={item} />
          ))
        ) : (
          <div className="h-full flex items-center justify-center border border-dashed border-black/10 rounded-lg p-8 min-h-[200px]">
            <p className="font-mono text-[10px] uppercase text-black/30 text-center">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="announcements" className="bg-[#FDFDFD] py-24 border-y border-black/5">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Intelligence Hub</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-black leading-[0.95] md:leading-[0.9] tracking-tight md:tracking-tighter">
              LATEST <br className="sm:hidden" />
              <span className="italic text-accent ml-0 sm:ml-4 md:ml-0">NOTIFICATIONS</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {renderColumn("General", "University Wide", generalItems, "No general updates")}
          {renderColumn("M.Sc. (CA & IT)", "Technology & IT", mscItems, "No M.Sc. updates")}
          {renderColumn("MBA", "Management Studies", mbaItems, "No MBA updates")}

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00000020;
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
};

export default AnnouncementsSection;
