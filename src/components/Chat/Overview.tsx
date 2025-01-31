import { motion } from "framer-motion";
import Link from "next/link";

import Image from "next/image";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <div className="flex flex-row justify-center gap-4 items-center ">
          <div className="rounded-full overflow-hidden w-[50px] h-[50px]">
            <Image
              src="/geralt.jpg"
              alt="Witcher"
              width={50}
              height={50}
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <p>
          Welcome to your personal chat with{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://witcher.fandom.com/wiki/Geralt_of_Rivia"
            target="_blank"
          >
            Geralt of Rivia
          </Link>{" "}
          the legendary Witcher. Experience authentic conversations with the
          White Wolf himself, complete with his signature gruff demeanor and dry
          wit.
        </p>
        <p>
          Prepare your coin and your questions wisely. Remember, a{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href="https://witcher.fandom.com/wiki/The_Witcher_3:_Wild_Hunt"
            target="_blank"
          >
            Witcher&apos;s
          </Link>{" "}
          time isn't free .
        </p>
      </div>
    </motion.div>
  );
};
