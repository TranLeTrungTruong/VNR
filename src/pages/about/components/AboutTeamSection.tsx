import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { teamMembers } from "../teamMembers";

export function AboutTeamSection() {
  const { i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";

  const creditsMembers = useMemo(() => [...teamMembers, ...teamMembers], []);
  const scrollDuration = Math.max(creditsMembers.length * 4, 16);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <Users className="h-8 w-8 text-amber-400" />
          <h2 className="text-3xl font-bold text-white">
            {isVietnamese ? "Đội ngũ của chúng tôi" : "Our Team"}
          </h2>
        </div>
       
      </div>

      <div className="relative mx-auto max-w-auto h-[560px] overflow-hidden">
        

        <motion.div
          className="flex flex-col gap-8 py-12 px-8"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: scrollDuration, ease: "linear", repeat: Infinity }}
        >
          {creditsMembers.map((member, index) => {
            const role = isVietnamese ? member.role.vi : member.role.en;
            const contributions = isVietnamese
              ? member.contributions.vi
              : member.contributions.en;

            return (
              <div
                key={`${member.name}-${index}`}
                className="mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-white/12 p-10 text-center text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-lg"
              >
                <h3 className="text-[26px] font-semibold tracking-tight mb-4 text-white drop-shadow-md">
                  {member.name}
                </h3>
                <p className="text-[15px] uppercase tracking-[0.45rem] text-amber-200/90 mb-6">
                  {role}
                </p>

                <div className="space-y-3 font-light text-base leading-relaxed text-white/85">
                  {contributions.map((contribution, idx) => (
                    <p key={idx} className="flex items-start justify-center gap-2 text-center">
                      <span className="max-w-2xl text-xl">
                        {contribution}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
