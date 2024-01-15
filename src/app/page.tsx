"use client";
import styles from './page.module.css';
import { TextInput } from '@/presentation/components/TextInput/TextInput';
import { Button } from '@/presentation/components/Button/Button';
import { useEffect, useState } from 'react';
import { getUser } from '@/infrastructure/actions/getUser';
import { setUser } from '@/infrastructure/actions/setUser';
import { User } from '@/domain/entities/User.entity';
import { useRouter } from 'next/navigation';


export default function Home() {
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
        .catch(err => console.log({ err }));
    }
  }, [userLogged]);

  const handleContinueButton = async () => {
    await setUser(name);
    router.push("/play");
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        Enter your name
        <TextInput
          placeholder='Marco'
          value={name}
          onChange={setName}
        />
        <Button
          title='Continue'
          onClick={handleContinueButton}
        />
      </div>
    </main>
  )
}
