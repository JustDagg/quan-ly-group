package com.npv.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.npv.utils.FileManager;

@Service
public class FileService implements IFileService {

	private FileManager fileManager = new FileManager();

	private String uploadDir = "C:/Users/Admin/Desktop/IMG/public/images/upload";

	@Override
	public String upLoadImage(MultipartFile image) throws IOException {

		String nameImage = System.currentTimeMillis() + "." +
				fileManager.getFormatFile(image.getOriginalFilename());

		String filePath = uploadDir + "/" + nameImage;

		fileManager.createNewMultiPartFile(filePath, image);

		return "/upload/" + nameImage;
	}
}
