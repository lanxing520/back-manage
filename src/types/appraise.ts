import { BaseComment } from './comment'

export interface AppraiseReply extends BaseComment {}

export interface Appraise extends BaseComment {
  score: number
  tips: string
  goodNumber: number
  replies: AppraiseReply[]
}

export interface AddAppraiseParams {
  text: string
  author: string
  avatar?: string
  score: number
  tips?: string
}

export interface AddAppraiseReplyParams {
  commentId: string
  reply: Omit<AppraiseReply, 'id' | 'time'>
}
