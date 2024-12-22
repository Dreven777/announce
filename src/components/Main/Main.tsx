import React, { useEffect, useState } from "react";
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
}

function Main() {
  const targetDate = new Date('2025-02-01T00:00:00');

  const [messages, setMessages] = useState<Message[]>([]);

  const [timeLeft, setTimeLeft] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  });
  const [openNews, setOpenNews] = useState<Message | null>(null);

  useEffect(() => {

    async function fetchMessages() {
      try {
        const response = await fetch('./data.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data.json');
        }
        const data = await response.json();
        setMessages(data);
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
      const offsetX = (mouseX - centerX) * 0.02;
      const offsetY = (mouseY - centerY) * 0.02;

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

  return (
    <div className={styles.main}>
      {openNews ? <>
        <div className={styles.modal}>
          <div className={styles.close_button} onClick={()=> setOpenNews(null)}>
            <img src={close} alt="close button"/>
          </div>
          <div className={styles.title}><img src={posts} alt=""/>{openNews.title}</div>
          <div className={styles.img}><img src={'https://s3-alpha-sig.figma.com/img/d5c3/db1f/cf15ddbb9a1d40a703cdf9e67ae58fbb?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TjDIEKA0s1yNb8rg2KFs6uVSd0m5vGWT-la911loWSdpH1~rEG4vEf9M8M8yx1FpOVXhcS2~fEye4FNT4qi6CSm0~fwa7zAvh2J-EcxVYlKscBAZYKOZALFXw5p4eMURDIpYuRadcXJan~HFRGEQkDJrcMwOKLikDlVrLCdEVKiPasUtzzVpm4wNULiMiSBtf53yMM9qfv4xWpIXtbFDkvJgkvhMp7AI0KHa2gVuu8zkAM3msMNoszTRdy3MHj3gY6t-5tj0NdTFxQ24x9dsUxgN0NY~bAsOOTv6Sax~uvg2M567HR~Cbcg0kDoQqK6QIqdf2nVxqLyDkUACW97b6w__'} alt="new image"/></div>
          <div className={styles.desc}>{openNews.desc}</div>
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
                <div className={styles.desc}>{item.desc}</div>
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
            Час змінювати правила.<br />
            Ласкаво просимо в Mansory.
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
