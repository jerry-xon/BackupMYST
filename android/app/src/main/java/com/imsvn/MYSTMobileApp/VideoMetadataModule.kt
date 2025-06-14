package com.imsvn.MYSTMobileApp


import android.media.MediaMetadataRetriever
import android.net.Uri
import android.os.ParcelFileDescriptor
import android.util.Log
import com.facebook.react.bridge.*
import java.io.File

class VideoMetadataModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "VideoMetadata"

    @ReactMethod
    fun getVideoDuration(uri: String, promise: Promise) {
        try {
            val retriever = MediaMetadataRetriever()
            val context = reactApplicationContext
            if (uri.startsWith("content://")) {
                val contentUri = Uri.parse(uri)
                retriever.setDataSource(context, contentUri)
            } else {
                retriever.setDataSource(uri)
            }
            val time = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION)
            retriever.release()
            val duration = time?.toLongOrNull() ?: 0L
            promise.resolve(duration / 1000.0) // seconds
        } catch (e: Exception) {
            promise.resolve(0)
        }
    }
}