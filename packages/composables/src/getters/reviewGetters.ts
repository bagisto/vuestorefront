import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import type { Review, ReviewItem } from '@vue-storefront/bagisto-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(reviewItems: ReviewItem[]): ReviewItem[] {
  if (!reviewItems) {
    return [];
  }

  const reviews = [];
  if (Array.isArray(reviewItems)) {
    for (const reviewDetail of reviewItems) {
      reviews.push(reviewDetail);
    }
  }

  return reviews;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewId(reviewItem: ReviewItem): string {
  if (!reviewItem) {
    return '';
  }

  return reviewItem?.id || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewAuthor(reviewItem: ReviewItem): string {
  if (!reviewItem) {
    return '';
  }

  return reviewItem?.customerName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewMessage(reviewItem: ReviewItem): string {
  if (!reviewItem) {
    return '';
  }

  return reviewItem?.comment || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewRating(reviewItem: ReviewItem): number {
  if (!reviewItem) {
    return 0;
  }

  return reviewItem?.rating || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewDate(reviewItem: ReviewItem): string {
  if (!reviewItem) {
    return '';
  }

  return reviewItem?.createdAt || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(reviewItems: ReviewItem[]): number {
  if (!reviewItems) {
    return 0;
  }

  return reviewItems.length;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(reviewItems: ReviewItem[]): number {
  if (!reviewItems) {
    return 0;
  }

  let total = 0;
  for (const review of reviewItems) {
    total += review.rating;
  }

  return Math.round(((total / getTotalReviews(reviewItems)) + Number.EPSILON) * 10) / 10;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRatesCount(review: Review): AgnosticRateCount[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewsPage(review: Review): number {
  return 0;
}

export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};
