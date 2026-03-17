import { Injectable } from '@angular/core'
import { Review } from '../../models/review.model'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews: Review[] = []

  getReviewsForToy(toyId: string): Review[] {
    return this.reviews.filter(r => r.toyId === toyId)
  }

  addReview(review: Review) {
    this.reviews.push(review)
  }

}