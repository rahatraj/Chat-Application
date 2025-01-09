import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

function Navbar() {
    const { logout, authUser } = useAuthStore();
  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
        <div className='container px-4 h-16 mx-auto'>
            <div className='flex items-center justify-between h-full'>
                <div className='flex items-center gap-8'>
                    <Link to="/" className='flex items-center gap-2.5 hover:opacit-100 transition-all'>
                        <div className='w-28 h-9 rounded-lg bg-primary/10 flex items-center justify-around'>
                            <MessageSquare className='w-5 h-5 text-primary' />
                            <h1 className='text-sm font-bold'>ChitChat</h1>
                        </div>
                    </Link>
                </div>

                <div className='flex items-center gap-2'>
                    <Link to={"/settings"}
                        className={`btn btn-md gap-2 transition-colors`}
                    >
                        <Settings className='size-8' />
                        <span className='hidden sm:inline'>Settings</span>
                    </Link>

                    {authUser && (
                        <>
                            <Link to={'/profile'} className={`btn btm-sm gap-2`}>
                                <User className='siz-8' />
                                <span className='hidden sm:inline'>Profile</span>
                            </Link>

                            <button className='flex gap-2 items-center' onClick={logout}>
                                <LogOut  className='size-8'/>
                                <span className='hidden sm:inline'>Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar