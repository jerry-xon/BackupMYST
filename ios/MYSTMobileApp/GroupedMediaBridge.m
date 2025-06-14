//
//  GroupedMediaBridge.m
//  MYSTMobileApp
//
//  Created by MACM72 on 05/06/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(GroupedMedia, NSObject)

RCT_EXTERN_METHOD(getGroupedMedia:
  (RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end
