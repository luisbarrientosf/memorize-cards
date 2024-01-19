"use client";
import styles from './HomeScreen.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/presentation/components/Button/Button';
import { TextInput } from '@/presentation/components/TextInput/TextInput';
import { User } from '@/domain/entities/User.entity';
import { getUser } from '@/infrastructure/actions/getUser';
import { setUser } from '@/infrastructure/actions/setUser';


export default function HomeScreen() {
  const router = useRouter();
  const [userLogged, setUserLogged] = useState<User|null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if(!userLogged) {
      getUser()
        .then(user => {
          setName(user.name);
          setUserLogged(user)
        })
        .catch(() => {
          // Manage error
        });
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
      
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <TextInput
          label='Enter your name:'
          placeholder='John Doe'
          value={name}
          onChange={setName}
          autoFocus
        />
        <Button
          title='Continue'
          disabled={name.trim().length === 0}
          onClick={handleContinueButton}
          type='submit'
        />
      </form>

      <footer className={styles.author}>
        <p>Developed by</p>
        <p>Luis Barrientos Fajardo</p>
      </footer>
  
    </main>
  )
}
