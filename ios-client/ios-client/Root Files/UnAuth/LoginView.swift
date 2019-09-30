//
//  LoginView.swift
//  ios-client
//
//  Created by Daniel Peach on 9/30/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit

class LoginView: UIView {
    var delegate: UnAuthDelegate?
    
    let showRegistrationBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        btn.backgroundColor = .white
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        btn.setTitle("Register instead", for: .normal)
        btn.addTarget(self, action: #selector(showRegistration), for: .touchUpInside)
        btn.translatesAutoresizingMaskIntoConstraints = false
        return btn
    }()
    
    @objc private func showRegistration() {
        delegate?.showRegistration()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .green
        addSubview(showRegistrationBtn)
        NSLayoutConstraint.activate([
            showRegistrationBtn.centerXAnchor.constraint(equalTo: centerXAnchor),
            showRegistrationBtn.centerYAnchor.constraint(equalTo: centerYAnchor),
            showRegistrationBtn.heightAnchor.constraint(equalToConstant: 40),
            showRegistrationBtn.widthAnchor.constraint(equalToConstant: 200)
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
