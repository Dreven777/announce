import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Typewriter } from "react-simple-typewriter";

import styles from './style.module.scss';
import stars_bg from './../../images/stars.png';
import logo from './../../images/logo.svg';
import posts from './../../images/icons/posts.svg';

import tiktok from './../../images/social/tiktok.svg';
import discord from './../../images/social/discord.svg';
import telegram from './../../images/social/telegram.svg';
import youtube from './../../images/social/youtube.svg';
import insta from './../../images/social/insta.svg';
import close from './../../images/icons/close.svg';

interface Message {
  title: string;
  desc: string;
  date: string;
  img?: string;
  link?: string;
}

function Main() {
  const targetDate = new Date('2025-03-01T00:00:00');

  const [messages, setMessages] = useState<Message[]>([]);

  const [timeLeft, setTimeLeft] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  });
  const [openNews, setOpenNews] = useState<Message | null>(null);

  useEffect(() => {

    async function fetchMessages(): Promise<void> {
      try {
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data.json');
        }
        const data: Message[] = await response.json();
        
        // Сортуємо масив повідомлень за датою (новіші повідомлення на початку)
        const sortedData = data.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('.');
          const [dayB, monthB, yearB] = b.date.split('.');
          
          // Створюємо об'єкти Date
          const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA));  // Місяць у JavaScript починається з 0
          const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));
    
          // Сортуємо від найновіших до найстаріших
          return dateB.getTime() - dateA.getTime();
        });
        
        setMessages(sortedData);
      } catch (error) {
        console.error('Error loading data.json:', error);
      }
    }
    

    fetchMessages();


    const handleMouseMove = (e: MouseEvent) => {
      const image = document.querySelector(`.${styles.stars_img} img`) as HTMLElement;
      const { clientX: mouseX, clientY: mouseY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (mouseX - centerX) * 0.01;
      const offsetY = (mouseY - centerY) * 0.01;

      image.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateTimer = () => {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
  
        if (diff <= 0) {
          setTimeLeft({ day: 0, hour: 0, minute: 0, second: 0 });
          clearInterval(timerInterval); 
        } else {
          const day = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const second = Math.floor((diff % (1000 * 60)) / 1000);
          
          setTimeLeft({ day, hour, minute, second });
        }
      };
  
      const timerInterval = setInterval(updateTimer, 1000);
  
      updateTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timerInterval); 
    };
  }, []);

  const truncateAndSanitize = (html : any, maxLength : number) => {
    const plainText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    const truncated = plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
    
    return DOMPurify.sanitize(truncated);
  };

  const words = ["Час змінювати правила. Ласкаво просимо в Mansory."];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if(event.key === 'Escape'){
          setOpenNews(null)
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  return (
    <div className={styles.main}>
      {openNews ? <>
        <div className={styles.modal}>
          <div className={styles.close_button} onClick={()=> setOpenNews(null)}>
            <img src={close} alt="close button"/>
          </div>
          <div className={styles.title}><img src={posts} alt=""/>{openNews.title}</div>
          {openNews.img ? <div className={styles.img}><img src={openNews.img} alt="new image"/></div>:null}
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: openNews.desc }}
          ></div>
          {openNews.link ? <div className={styles.button} onClick={()=> window.open(`${openNews.link}`, "_blank")}>
              Дізнатися більше
            </div>:null}
          <div className={styles.date}>{openNews.date}</div>
        </div>
      </>: null}
      <div className={styles.stars_img}>
        <img src={stars_bg} alt="stars" />
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          {messages.length > 0 ? (
            messages.map((item, index) => (
              <div
                key={index}
                className={styles.part}
                onClick={() => setOpenNews(item)}
              >
                <div className={styles.title}>
                  <img src={posts} alt="" />
                  {item.title}
                </div>
                <div
                    className={styles.desc}
                    dangerouslySetInnerHTML={{
                      __html: truncateAndSanitize(item.desc, 256),
                    }}
                  ></div>
                <div className={styles.date}>{item.date}</div>
              </div>
            ))
          ) : (
            <div className={styles.noMessages}></div>
          )}
        </div>


        <div className={styles.right}>
          <img src={logo} alt="logo" />
            <h1>
              <Typewriter
                words={words}
                loop={false}
                cursor
                typeSpeed={70}
                deleteSpeed={0}
                delaySpeed={9999999}
              />
            </h1>
          <div className={styles.timer}>
            <div className={styles.part}>
              <div className={styles.count}>{timeLeft.day}</div>
              <div className={styles.horizontal_line}></div>
              <div className={styles.text}>день</div>
            </div>
            <div className={styles.part}>
              <div className={styles.count}>{timeLeft.hour}</div>
              <div className={styles.horizontal_line}></div>
              <div className={styles.text}>годин</div>
            </div>
            <div className={styles.part}>
              <div className={styles.count}>{timeLeft.minute}</div>
              <div className={styles.horizontal_line}></div>
              <div className={styles.text}>хвилин</div>
            </div>
            <div className={styles.part}>
              <div className={styles.count}>{timeLeft.second}</div>
              <div className={styles.horizontal_line}></div>
              <div className={styles.text}>секунд</div>
            </div>
          </div>
          <a href="https://forum.mansory-rp.com/index.php" target='_blank'>
            <div className={styles.button}>
              Дізнатися більше
            </div>
          </a>
        </div>
      </div>
      <div className={styles.bottom_social}>
            <div className={styles.list}>
              <a href="#" target='_blank'><img src={insta} alt="instagram link"/></a>
              <a href="#" target='_blank'><img src={youtube} alt="youtube link"/></a>
              <a href="https://discord.com/invite/wTJM2uh2" target='_blank'><img src={discord} alt="discord link"/></a>
              <a href="#" target='_blank'><img src={tiktok} alt="tiktok link"/></a>
              <a href="https://t.me/mansory_rp" target='_blank'><img src={telegram} alt="telegram link"/></a>
            </div>
            <div className={styles.text}>Mansory - Не пов’язаний із Take-Two, Rockstar North Interactive, чи будь-яким іншим правовласником і не
            <br/> підтримується ними. Усі використані торгові марки належать відповідним власникам.</div>
      </div>
    </div>
  );
}

export default Main;
