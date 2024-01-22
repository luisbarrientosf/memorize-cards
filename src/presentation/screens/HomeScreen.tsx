"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/domain/entities/User.entity';
import { getUser } from '@/infrastructure/actions/getUser';
import { setUser } from '@/infrastructure/actions/setUser';
import { LoginForm } from '@/presentation/components/LoginForm';


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
    <main className="flex flex-col items-center p-24 min-[100vh] gap-28">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">
          Memorize 
        </h1>
        <h3 className="text-xl">
          Card Game
        </h3>
      </section>
      
      <LoginForm
        name={name}
        onChangeName={name => setName(name)}
        handleContinueButton={handleContinueButton}
      />

      <footer className="text-center">
        <p className="font-extralight">Developed by</p>
        <p className="font-normal">Luis Barrientos Fajardo</p>
      </footer>
  
    </main>
  )
}
