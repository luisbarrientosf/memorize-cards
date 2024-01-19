"use client";
import styles from './HomeScreen.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/domain/entities/User.entity';
import { getUser } from '@/infrastructure/actions/getUser';
import { setUser } from '@/infrastructure/actions/setUser';
import { LoginForm } from '@/presentation/components/LoginForm/LoginForm';


export default function HomeScreen() {
  const router = useRouter();
  const [userLogged, setUserLogged] = useState<User|null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if(!userLogged) {
      getUser()
        .then(user => {
          setName(user.name);
          setUserLogged(user);
        })
        .catch(() => setName("User"));
    }
  }, [userLogged]);

  const handleContinueButton = async () => {
    await setUser(name);
    router.push(`/play?player=${name}`);
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>
          Memorize 
        </h1>
        <h3>
          Card Game
        </h3>
      </div>
      
      <LoginForm
        name={name}
        onChangeName={name => setName(name)}
        handleContinueButton={handleContinueButton}
      />

      <footer className={styles.author}>
        <p>Developed by</p>
        <p>Luis Barrientos Fajardo</p>
      </footer>
  
    </main>
  )
}
