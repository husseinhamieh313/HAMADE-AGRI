import React from 'react';

export default function StarRating({ value = 0, onChange, readOnly = false, size = 18 }) {
  const rounded = Math.round(value);
  // Interactive mode renders 5→1 in the DOM (paired with flex-direction: row-reverse in CSS)
  // so the ":hover ~ .star" sibling trick can light up everything to the left of the cursor.
  const stars = readOnly ? [1, 2, 3, 4, 5] : [5, 4, 3, 2, 1];

  return (
    <div
      className={readOnly ? 'star-rating' : 'star-rating star-rating-interactive'}
      style={{ fontSize: size }}
    >
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rounded ? 'star-filled' : ''}`}
          onClick={readOnly ? undefined : () => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}