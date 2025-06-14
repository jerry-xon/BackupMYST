import Foundation
import Photos
import React

@objc(GroupedMedia)
class GroupedMedia: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func getGroupedMedia(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    PHPhotoLibrary.requestAuthorization { status in
      guard status == .authorized || status == .limited else {
        reject("PERMISSION_DENIED", "Photo library access denied", nil)
        return
      }

      var resultArray: [[String: Any]] = []

      // Fetch all albums
      let options = PHFetchOptions()
      options.sortDescriptors = [NSSortDescriptor(key: "startDate", ascending: false)]

      let albums = PHAssetCollection.fetchAssetCollections(with: .album, subtype: .any, options: nil)
      albums.enumerateObjects { collection, _, _ in
        let assetsFetchResult = PHAsset.fetchAssets(in: collection, options: nil)
        if assetsFetchResult.count == 0 { return }

        var mediaArray: [[String: String]] = []

        assetsFetchResult.enumerateObjects { asset, _, _ in
          let mediaType = (asset.mediaType == .video) ? "video" : "photo"
          let uri = "ph://\(asset.localIdentifier)"
          mediaArray.append([
            "uri": uri,
            "type": mediaType
          ])
        }

        resultArray.append([
          "folder": collection.localizedTitle ?? "Unknown",
          "media": mediaArray
        ])
      }

      resolve(resultArray)
    }
  }
}
