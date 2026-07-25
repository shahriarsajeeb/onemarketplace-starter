export function BrandMark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#252724] text-white">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4.25"
          y="4.25"
          width="15.5"
          height="15.5"
          rx="4.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect x="7" y="7" width="4" height="4" rx="1.25" fill="currentColor" />
        <rect
          x="13"
          y="7"
          width="4"
          height="4"
          rx="1.25"
          fill="currentColor"
          opacity="0.65"
        />
        <rect
          x="7"
          y="13"
          width="4"
          height="4"
          rx="1.25"
          fill="currentColor"
          opacity="0.65"
        />
        <rect x="13" y="13" width="4" height="4" rx="1.25" fill="currentColor" />
      </svg>
    </span>
  );
}
