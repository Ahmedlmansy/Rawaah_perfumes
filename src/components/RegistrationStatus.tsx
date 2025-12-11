"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCart } from "@/store/apis/cartApi";
import { fetchWishlist } from "@/store/apis/wishlistApi";

export default function RegistrationStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const supabase = createSupabaseClient();

  const { items: cart } = useSelector((state: RootState) => state.cart);
  const { items: wishlist } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    setMounted(true);

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          dispatch(fetchCart(user.id));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          dispatch(fetchCart(currentUser.id));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [user?.id, dispatch]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await supabase.auth.signOut();
      setUser(null);

      await new Promise((resolve) => setTimeout(resolve, 300));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4">
          {/* cart */}
          <Link href="/cart" className="relative group">
            <Badge
              className="h-5 min-w-5 absolute rounded-full px-1 top-[-7px] left-[-17px] flex justify-center items-center text-center z-10"
              variant="default"
            >
              {cart?.length || 0}
            </Badge>
            <i className="fa-solid fa-cart-shopping text-[24px] text-[#A38862] group-hover:text-[#8a7050] transition-colors"></i>
          </Link>

          {/* wishlist */}
          <Link href="/wishlist" className="relative group">
            <Badge
              className="h-5 min-w-5 absolute rounded-full px-1 top-[-7px] left-[-17px] flex justify-center items-center text-center z-10"
              variant="default"
            >
              {wishlist.length}
            </Badge>
            <i className="fa-regular fa-heart text-[24px] text-[#A38862] group-hover:text-[#8a7050] transition-colors"></i>
          </Link>

          {/* profile */}
          <Link href="/profile" className="group">
            <i className="fa-regular fa-user text-[24px] text-[#A38862] group-hover:text-[#8a7050] transition-colors"></i>
          </Link>

          {/*  logout */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            disabled={loggingOut}
            className="hover:bg-transparent p-0 h-auto"
          >
            {loggingOut ? (
              <Spinner className="w-6 h-6" />
            ) : (
              <i className="fa-solid fa-arrow-right-from-bracket text-[24px] text-[#A38862] hover:text-red-600 transition-colors"></i>
            )}
          </Button>
        </div>
      ) : (
        <div>
          <Link href="/login" className="group">
            <i className="fa-solid fa-right-to-bracket text-[24px] text-[#A38862] group-hover:text-[#8a7050] transition-colors"></i>
          </Link>
        </div>
      )}
    </div>
  );
}
